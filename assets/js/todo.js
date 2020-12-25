angular.module("todoApp", []).controller("TodoController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    var app = this;

    app.todos = [];
    app.fetchingTodos = true;
    app.selectedTodo = null;
    app.editTodo = false;
    app.selectedIndex = -1;
    app.filter = "";
    app.hasError = false;

    $scope.byStatus = function (value) {
      $scope.status = value;
    };

    $scope.load = function () {
      app.fetchingTodos = true;
      $http({
        method: "GET",
        url: "http://localhost:3000/api/todos",
      }).then(
        function successCallback(response) {
          console.log(response);
          if (response.status === 200) {
            var todos = [];

            angular.forEach(
              response.data,
              function (value) {
                var status = "";

                if (value.isDone) {
                  status = "completed";
                }

                this.push(
                  Object.assign(value, {
                    status: status,
                  })
                );
              },
              todos
            );
            console.log(todos);
            app.todos = todos;
          }
          app.fetchingTodos = false;
        },
        function errorCallback(response) {
          console.log(response, "error");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          app.fetchingTodos = false;
        }
      );
    };

    app.clickAddNewTodo = function (event) {
      if (!event.target.value) {
        app.hasError = true;
        return;
      }
      if (event.key === "Enter") {
        app.hasError = false;
        var inputValue = app.inputValue;
        console.log(app.editTodo);
        if (app.editTodo) {
          if (app.selectedIndex >= 0) {
            var todo = app.todos[app.selectedIndex];
            console.log(todo, "TODO");
            app.todos[app.selectedIndex] = Object.assign(
              app.todos[app.selectedIndex],
              {
                value: inputValue,
              }
            );

            $http
              .put("http://localhost:3000/api/todos/" + app.selectedTodo._id, {
                value: inputValue,
                isDone: todo.isDone,
              })
              .then(
                function successCallback(response) {
                  console.log(response);
                  // this callback will be called asynchronously
                  // when the response is available
                },
                function errorCallback(response) {
                  console.log(response, "error");
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                }
              );
          } else {
            alert("Something went wrong!");
          }
        } else {
          $http
            .post("http://localhost:3000/api/todos", {
              value: app.inputValue,
            })
            .then(
              function successCallback(response) {
                console.log(response);
                app.todos.push(response.data);
                // this callback will be called asynchronously
                // when the response is available
              },
              function errorCallback(response) {
                console.log(response, "error");
              }
            );
        }

        app.inputValue = "";
      }
    };

    app.onChange = function (event) {
      if (!event.target.value) {
        app.hasError = true;
      } else {
        app.hasError = false;
      }
    };

    app.handleMarkAsCompleted = function (todo, index, event) {
      app.todos[index] = Object.assign(app.todos[index], {
        isDone: event.target.checked,
      });

      $http
        .put("http://localhost:3000/api/todos/" + todo._id + "/completed", {
          isDone: event.target.checked,
        })
        .then(
          function successCallback(response) {},
          function errorCallback(response) {
            console.error(response);
          }
        );
    };

    app.handleEditTodo = function (todo, index) {
      app.editTodo = true;
      app.inputValue = todo.value;
      app.selectedTodo = todo;
      app.selectedIndex = index;
    };

    app.handleDeleteTodo = function (todo, index) {
      var confirm = window.confirm(
        "Are you sure you want to delete this todo item?"
      );

      console.log(confirm);

      if (confirm) {
        app.todos.splice(index, 1);
        app.selectedIndex = -1;
        app.inputValue = "";
        $http.delete("http://localhost:3000/api/todos/" + todo._id).then(
          function successCallback(response) {
            console.log("DElETE SUCCESS");
          },
          function errorCallback(response) {
            console.log("FAILED TO DELETE TODO");
            console.error(response);
          }
        );
      }
    };

    // app.handleFilterTodos = function (event) {
    //   console.log(event.target.value, "VALUE");
    //   var todos = app.todos;
    // };
  },
]);
