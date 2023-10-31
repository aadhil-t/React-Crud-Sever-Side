const express = require('express')
const adminRoute = express()
const adminController = require('../Controller/adminController');

// ******* ADMIN LOGIN SECTION ROUTE *******//
adminRoute.post('/login',adminController.adminLogin);
adminRoute.get('/userlist',adminController.viewUserList)
adminRoute.get('/edituser/:id',adminController.editUserDetails)
adminRoute.post('/updateuser',adminController.updateUserDetails)
adminRoute.post('/deleteUser',adminController.deleteUserDetails)

module.exports=adminRoute