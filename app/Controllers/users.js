require('dotenv').config();
const db = require('../../migration');
const User = require('../Models/users');
const bcrypt =require('bcrypt')
const {sign} =require('jsonwebtoken')
module.exports = {

   /**
    * store user details.
    */
   userStore: (req, res, next) => {
      const userData = {
         username: req.body.username,
         email: req.body.email,
         mobile: req.body.mobile,
      }
      const salt =bcrypt.genSaltSync(10);
      userData.password=bcrypt.hashSync(req.body.password,salt)
      const user = new User(userData);
     
      db.query(user.addUser(), (err, result) => {
         if (err) {
            let msg=err.message
            console.log(msg)
            if(msg.includes('Duplicate entry')){
               console.log('hek')
               res.status(200).json({
                  'status':false,
                  'message':'User already exits',
               })
            }else{
              res.status(400).json({
               'status':false,
               'error': err.message,
               'error_line': err.files
            })
            }
            
         };
         if(result){
            db.query(User.getUserById(result.insertId), (err, userData) => {
               console.log(userData[0]);
               const jsontoken=sign({result:result},"qwe1234",{
                   expiresIn:"1h"
               });
               userData[0].password=undefined
               res.status(200).json({
                  'status':true,
                  'data':jsontoken,
               });
            })
         }

      });
   },

   /**
    * Get the lists of all users.
    */
   usersLists: (req, res, next) => {
      db.query(User.getAllUsers(), (err, result) => {
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
   updateUser: (req, res, next) => {
      const userData = {
        username: req.body.username,
         email: req.body.email,
         mobile: req.body.mobile,
      }
      const salt=genSaltSync(10);
      userData.password=hashSync(req.body.password,salt)
      const user = new User(userData);
      const id = req.params.id;
      db.query(user.updateUser(id), (err, result) => {
         if(err) {
            res.status(400).json({
                'status':false,
               'error': err.message,
            });
         }

         db.query(User.getUserById(id), (err, userData) => {

            if (err) {
               res.status(400).json({
                  'status':false,
                  'error': err.message,
               });
            }
            if(userData[0]){
             
               
               res.status(200).json({
                   status:true,
                   message:"User updated successfully",
                   token:userData[0]
               })
            }

            // res.status(200).json({
            //    'status':true,
            //    'message': '.',
            //    'data': userData[0],
            // });
         });
      });
   },
   /**
    * get user details by user id.
    */
   getUserById: (req, res, next) => {
      const id = req.params.id;
      db.query(User.getUserById(id), (err, result) => {
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

   deleteUser: (req, res, next) => {
      const id = req.params.id;
      db.query(User.deleteUserById(id), (err, result) => {
         if (err) {
            res.status(404).json({
               'status':false,
               'error': err.message,
            });
         }

         res.status(200).json({
            'message': 'User deleted successfully.',
         });
      })
   },
    /**
    * Login .
    */
   login: (req, res, next) => {
      const body=req.body;
  
    db.query(User.getUserByEmail(body.email), (err, results) => {
      if(err){
         res.status(404).json({
            'status':false,
            'error': err.message,
         });
     }
     if(!results){
      res.status(404).json({
         status:false,
         message:'Invalid email or password'
      });
     }
     let result=false;
     console.log(results[0])
     if(results[0] !=undefined){
       result=bcrypt.compareSync(body.password,results[0].password);
       console.log(result)
     }
     if(result){
         results[0].password=undefined;
         const jsontoken=sign({result:results[0]},"qwe1234",{
             expiresIn:"1h"
         });
         
         res.json({
             status:true,
             message:"Login sucessfully",
             token:jsontoken
         })
     }else{
          res.json({
              status:false,
              message:"Invaild email or password"
          })
     }
    });
 },
}