const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo