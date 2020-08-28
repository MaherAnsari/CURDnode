var express = require('express');
var router = express.Router();
var TodoController = require('../app/Controllers/todo');
const {checkToken}=require('../app/auth/token_validation')

/* GET users listing. */
router.post('/' ,checkToken,TodoController.todoStore);
router.get('/lists', checkToken,TodoController.todoLists);
router.put('/:id', checkToken,TodoController.updateTodo);
router.delete('/:id', checkToken,TodoController.deleteTodo);
router.get('/:id', checkToken,TodoController.getTodoById);


module.exports = router;