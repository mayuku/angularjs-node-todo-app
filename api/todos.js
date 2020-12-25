var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var todoSchema = new Schema({
  value: String,
  isDone: Boolean,
  created_date: Date,
});

var Todo = mongoose.model("Todos", todoSchema);

module.exports = function (app) {
  app.get("/api/todos", function (req, res) {
    Todo.find(function (err, todos) {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json(todos);
    });
  });

  app.get("/api/todos/:id", function (req, res) {
    Todo.findById({ _id: req.params.id }, function (err, todo) {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json(todo);
    });
  });

  //Create a todo
  app.post("/api/todos", function (req, res) {
    if (!req.body.value) {
      return res.status(422).json({
        error: "Value is required.",
      });
    }

    var todo = {
      value: req.body.value,
      isDone: false, // false
      created_date: new Date(),
    };

    Todo.create(todo, function (err, todo) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(todo);
    });
  });

  //update a todo
  app.put("/api/todos/:id", function (req, res) {
    if (!req.body.value) {
      return res.status(422).json({
        error: "Value is required.",
      });
    }

    Todo.update(
      {
        _id: req.params.id,
      },
      {
        value: req.body.value,
        isDone: req.body.isDone,
      },
      function (err, todo) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(todo);
      }
    );
  });

  //delete
  app.delete("/api/todos/:id", function (req, res) {
    Todo.remove(
      {
        _id: req.params.id,
      },
      function (err, todo) {
        if (err) {
          return res.status(500).json(err);
        }

        return res.status(204);
      }
    );
  });

  app.put("/api/todos/:id/completed", function (req, res) {
    Todo.update(
      {
        _id: req.params.id,
      },
      {
        isDone: req.body.isDone,
      },
      function (err, todo) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(todo);
      }
    );
  });
};
