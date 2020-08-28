require('dotenv').config();
const db = require('../../migration');
const Todo = require('../Models/todos');

module.exports = {

   /**
    * store user details.
    */
   todoStore: (req, res, next) => {
      const todoData = {
         title: req.body.todo_title,
         desc: req.body.todo_desc,
         priority:req.body.priority,
         // date:req.body.todo_date
      }
    
      const todo = new Todo(todoData);
     
      db.query(todo.addTodos(), (err, result) => {
         if (err) {
            res.status(400).json({
               'status':false,
               'error': err.message,
               'error_line': err.files
            })
         };
         if(result){
            db.query(Todo.getTodoById(result.insertId), (err, todoData) => {
             
               res.status(200).json({
                  'status':true,
                  'data': todoData[0],
               });
            })
         }

      });
   },

   /**
    * Get the lists of all users.
    */
   todoLists: (req, res, next) => {
      db.query(Todo.getAllTodos(), (err, result) => {
         if (err) {
            res.status(400).json({
                'status':false,
               'error': err.message,
            })
         }

         res.status(200).json({
            'status':true,
            'data': result,
         });
      })
   },

   /**
    * Update user details.
    */
   updateTodo: (req, res, next) => {
      const todoData = {
         title: req.body.todo_title,
         desc: req.body.todo_desc,
         // date: req.body.date,
         priority:req.body.priority
      }
      
      const todo = new Todo(todoData);
      const id = req.params.id;
      db.query(todo.updateTodo(id), (err, result) => {
         if(err) {
            res.status(400).json({
                'status':false,
               'error': err.message,
            });
         }

         db.query(Todo.getTodoById(id), (err, todoData) => {

            if (err) {
               res.status(400).json({
                  'status':false,
                  'error': err.message,
               });
            }

            res.status(200).json({
               'status':true,
               'message': 'Todo updated successfully.',
               'data': todoData[0],
            });
         });
      });
   },
   /**
    * get user details by user id.
    */
   getTodoById: (req, res, next) => {
      const id = req.params.id;
      db.query(Todo.getTodoById(id), (err, result) => {
         if(err) {
            res.status(404).json({
               'status':false,
               'error': err.message,
            });
         }

         res.status(200).json({
            'status':true,
            'data': result[0],
         });
      })
   },

   deleteTodo: (req, res, next) => {
      const id = req.params.id;
      db.query(Todo.deleteTodoById(id), (err, result) => {
         if (err) {
            res.status(404).json({
               'status':false,
               'error': err.message,
            });
         }

         res.status(200).json({
            'status':true,
            'message': 'Todo deleted successfully.',
         });
      })
   },

}