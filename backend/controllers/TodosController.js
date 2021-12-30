const Todo = require('../models/Todo')

module.exports.todosController = {
  addTodo: async (req, res) => {
    try {
      const todo = await Todo.create({
        text: req.body.text,
        done: req.body.done
      })
      res.json(todo)
    } catch (e) {
      res.json(e)
    }
  },
  getTodo: async (req, res) => {
    try {
      const todos = await Todo.find()
      res.json(todos)
    } catch (e) {
      res.json(e)
    }
  },
  deleteTodo: async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id)
      res.send('Todo deleted')
    } catch (e) {
      res.json(e)
    }
  },
  patchTodo: async (req, res) => {
    try {
      await Todo.findByIdAndUpdate(req.params.id, {
        done: req.body.done
      })
      res.send('Ключ изменен')
    } catch (e) {
      res.json(e)
    }
  }
}