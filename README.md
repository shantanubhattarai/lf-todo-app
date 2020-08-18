- frontend - yarn start, runs on localhost:3000
- backend - npm start, runs on localhost:9090
            apis: /api/auth/login -- post request with body {username, password}
                  /api/auth/register -- post request with body {username, password}
                  /api/todo -- get request with header {authorization: 'jwttoken'}
                  /api/todo -- post request with header {authorization: 'jwttoken'} and body {content: 'todo content', id: todoid}
                  /api/todo -- put request with header {authorization: 'jwttoken'} and body {isCompleted: completedState(0 or 1)}
                  /api/todo -- delete request with header {authorization: 'jwttoken'} and body {id: todoid}
- sql - import db.sql file, host on port 3306, user: root, password: '' (empty)

*env db_pass not working*
