var express = require('express');
var router = express.Router();
var UserController = require('../app/Controllers/users');
const {checkToken}=require('../app/auth/token_validation')

/* GET users listing. */
router.post('/' ,UserController.userStore);
router.get('/lists', checkToken,UserController.usersLists);
router.put('/:id', checkToken,UserController.updateUser);
router.delete('/:id', checkToken,UserController.deleteUser);
router.get('/:id', checkToken,UserController.getUserById);
router.post('/login', UserController.login);

module.exports = router;