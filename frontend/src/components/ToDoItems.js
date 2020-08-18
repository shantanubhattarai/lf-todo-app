import React from "react";

class ToDoItems extends React.Component {
  delete = (key) => {
    this.props.delete(key);
  };

  complete = (key) => {
    this.props.complete(key);
  };

  render() {
    let toDoEntries = this.props.entries;

    let listItems = toDoEntries.map((item) => {
      return (
        <li
          key={item.id}
          className={`clearFix ${item.isCompleted ? "checked" : ""}`}
        >
          <input
            type="checkBox"
            className="todoCheck pullLeft"
            onChange={() => this.complete(item.id)}
            checked={item.isCompleted}
          />
          <p className="todoText pullLeft">{item.content}</p>
          <button className="deleteBtn" onClick={() => this.delete(item.id)}>
            Delete
          </button>
        </li>
      );
    });

    return <ul className="tasksList">{listItems}</ul>;
  }
}

export default ToDoItems;
