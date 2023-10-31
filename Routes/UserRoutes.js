const express=require('express')
const userRouter=express()
const userController=require('../Controller/UserController')
const { uploadOptions } = require('../Configuration/Multer')

userRouter.post('/signup',userController.userReg)
userRouter.post('/login',userController.userLogin)


// ********* USER IMAGE UPDATING ROUTE **********//
userRouter.post('/profileImage',uploadOptions.single('image'),userController.userProfileImageUpdate);

module.exports=userRouter