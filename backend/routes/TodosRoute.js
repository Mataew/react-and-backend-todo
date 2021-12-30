const { todosController } = require('../controllers/TodosController')
const { Router } = require('express');
const { route } = require('express/lib/router');

const router = Router()

router.post('/todos', todosController.addTodo)
router.get('/todos', todosController.getTodo)
router.delete('/todos/:id', todosController.deleteTodo)
router.patch('/todos/:id', todosController.patchTodo)

module.exports = router