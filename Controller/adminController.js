const User = require('../Models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



const securePassword = async(password) =>{
    try{
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;
    }catch(err){
        console.log(err.message);
    }
}

// ********** ADMIN LOGIN MANGEMENT SECTION ***********//
const adminLogin = async(req,res) =>{
    try{
console.log("admin login");
        const {email,password} = req.body

        const emailExist = await User.findOne({email:email});
        console.log(emailExist);
        if(emailExist){
            if(emailExist.is_admin === 1){
                const access = await bcrypt.compare(password,emailExist.password);
                if(access){
                    const adminToken = jwt.sign({ adminId : emailExist._id }, "mysecret", { expiresIn: '1h' });
                    res.json({adminData:emailExist,status:true,adminToken});
                }else{
                    res.json({alert:'Invalid user name and password'});
                }
            }else{
                res.json({alert:'You are not an admin'});
            }
        }else{
            res.json({alert:'Email does not exist'});
        }

    }catch(err){
        console.log(err);
    }
}

const viewUserList = async(req,res)=>{
    try {
        const UserDetails = await User.find({is_admin:0})
        console.log(UserDetails);
        res.json({userData:UserDetails})
    } catch (error) {
        console.log(error)
    }
}


// ********** ADMIN SIDE USER DETAILS EDITING SECTION ***********//
const editUserDetails = async (req,res) =>{
    try{
        const userId = req.params.id
        const userData = await User.findOne({_id:userId});
        if(userData){
            res.json({userData,status:true,message:'data found'})
        }else{
            res.json({status:false,message:'data not found'})
        }
    }catch(err){
        console.log(err);
    }
}


// ********** ADMIN USER DATA UPDATING SECTION ***********//
const updateUserDetails = async (req,res) =>{
    try{
        const {id,name,mobile,email} = req.body 
        console.log(mobile);
        const updateUserData = await User.updateOne({_id:id},{$set:{name,mobile:mobile,email}})
        if(updateUserData){
            res.json({userData:updateUserData,status:true,alert:'updation completed'})
        }else{
            res.json({status:false,alert:'the updation not complete'})
        }
    }catch(err){
        console.log(err);
    }
}

const deleteUserDetails = async(req,res)=>{
    try {
        const userId = req.body.userid;
        const deleteData = await User.deleteOne({_id:userId});
        if(deleteData){
            res.json({delete:true})
        }else{
            res.json({delete:false})
        } 
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    adminLogin,
    viewUserList,
    editUserDetails,
    updateUserDetails,
    deleteUserDetails
}