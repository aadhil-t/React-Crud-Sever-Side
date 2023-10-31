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

// **************** USER REGISTATION DATA STORING AND RESPONSE SENDING SECTION ***********//
const userReg=async(req,res)=>{
    try {
        const {name,email,number,password}=req.body
        const spassword = await securePassword(password);
        const emailExist = await User.findOne({email:email})
        
        if(emailExist){
            return res.json({alert:"Email already exists"})
        }
        else{
            const user = new User({
                name:name,
                email:email,
                mobile:number,
                password:spassword,
                is_admin:0 
            })
            const userData = await user.save();
            const token = jwt.sign({userId: userData._id},"mysecret",{expiresIn: '1h'})
            return res.json({userData,alert:'Registaion',status:true});
        }

    } catch (error) {
        console.log(error.message);
    }
}


// ********** USER LOGIN VERIFICATION SECTION ***********//
const userLogin = async(req,res)=>{
    try {
        console.log("functon login");
        const {email,password} = req.body
        const  emailexist = await User.findOne({email:email})
        if(emailexist){
            const access = await bcrypt.compare(password,emailexist.password);
            if(access){
                const token = jwt.sign({ userId: emailexist.id},"mysecret",{expiresIn: '1h'})
                res.json({userData:emailexist,status:true,token});
            }else{
                res.json({alert:'Password is incorrect'})
            }
        }else{
            res.json({alert:"No account in this email",status:false})
        }
    } catch (error) {
        console.log(error)
    }
}


const  userProfileImageUpdate = async(req,res)=>{
    try {
        const id=req.body.userId
        const image=req.file.filename
        const updateImg = await User.findOneAndUpdate({_id:id},{$set:{image:image}},{new:true}).then((response)=>{
            res.json({updated:true,data:response})
        })
    } catch (error) {
        
    }
}
module.exports={
    userReg,
    userLogin,
    userProfileImageUpdate
}