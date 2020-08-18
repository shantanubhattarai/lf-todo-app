import React from "react";
import ToDoItems from "./ToDoItems";
import FilterButton from "./FilterButton";
import { Redirect } from "react-router-dom";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "",
      searchText: "",
      items: [],
      filter: "none",
    };
  }

  updateItemsFromDB() {
    if (
      !localStorage.getItem("authToken") ||
      localStorage.getItem("authToken") === ""
    ) {
      return;
    }
    fetch("http://localhost:9090/api/todo", {
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    })
      .then((response) => response.json())
      .then((response) => this.setState({ items: Object.values(response) }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.updateItemsFromDB();
  }

  addTask = (e) => {
    e.preventDefault();
    if (this.state.currentValue !== "") {
      fetch("http://localhost:9090/api/todo", {
        method: "post",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ content: this.state.currentValue }),
      })
        .then(this.setState({ currentValue: "" }))
        .then(this.updateItemsFromDB())
        .catch((err) => console.log(err));
    }
  };

  handleInputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };

  deleteItem = (key) => {
    let items = this.state.items;
    let itemIdx = items.findIndex((task) => task.id === key);
    let item = items[itemIdx];
    fetch("http://localhost:9090/api/todo", {
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        id: item.id,
      }),
    })
      .then(this.updateItemsFromDB())
      .catch((err) => console.log(err));
  };

  handleCompleted = (key) => {
    let items = this.state.items;
    let itemIdx = items.findIndex((task) => task.id === key);
    let item = items[itemIdx];

    fetch("http://localhost:9090/api/todo", {
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        content: item.content,
        isCompleted: !item.isCompleted,
        id: item.id,
      }),
    })
      .then(this.updateItemsFromDB())
      .catch((err) => console.log(err));
  };

  setSearchText = (e) => {
    this.setState({ searchText: e.target.value.toLowerCase() });
  };

  filterOnSearch = (displayItems) => {
    let tempDisplayItems = [...displayItems];
    if (
      this.state.searchText &&
      this.state.searchText !== "" &&
      this.state.searchText !== " "
    ) {
      let searchQuery = this.state.searchText.toLowerCase();
      tempDisplayItems = tempDisplayItems.filter((item) => {
        let searchValue = item.content.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      });
    }

    return tempDisplayItems;
  };

  checkFilters = (tempDisplayItems) => {
    let displayItems = [...tempDisplayItems];
    if (this.state.filter === "completed") {
      displayItems = this.state.items.filter((item) => {
        return item.isCompleted;
      });
    } else if (this.state.filter === "remaining") {
      displayItems = this.state.items.filter((item) => {
        return !item.isCompleted;
      });
    }
    return displayItems;
  };

  setFilter = (value) => {
    this.setState({ filter: value });
  };

  render() {
    return (
      <div className="toDoListContainer">
        {localStorage.getItem("authToken") ? (
          ""
        ) : (
          <Redirect to="/login"></Redirect>
        )}
        <h1 className="toDoTitle">Your Tasks</h1>
        <div className="toDoSearch">
          <input
            type="text"
            className="searchBar"
            placeholder="Search here"
            onChange={this.setSearchText}
          />
        </div>
        <div className="toDoFilters">
          <h3>Filter your tasks</h3>
          <FilterButton
            filterFunc={this.setFilter}
            type="none"
            text="All Items"
          />
          <FilterButton
            filterFunc={this.setFilter}
            type="completed"
            text="Completed"
          />
          <FilterButton
            filterFunc={this.setFilter}
            type="remaining"
            text="Remaining"
          />
        </div>
        <div className="toDoForm">
          <form onSubmit={this.addTask}>
            <input
              type="text"
              className="toDoForm__input"
              placeholder="Enter task"
              value={this.state.currentValue}
              onChange={this.handleInputChange}
            />
            <button className="toDoForm__button" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="toDoItems">
          <ToDoItems
            entries={this.checkFilters(this.filterOnSearch(this.state.items))}
            delete={this.deleteItem}
            complete={this.handleCompleted}
          />
        </div>
      </div>
    );
  }
}

export default ToDoList;
