import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import  Jwt  from "jsonwebtoken";

const signupMobileController =()=>{
      //otp verification

      //check whether existing user
}

const signupEmailController=()=>{
    //password or otp verification

    //check whether existing user
}

//customer mobile login
const mobileLoginController=()=>{
    //otp verification
}

//customer email login
const emailLoginController=async (req,res)=>{
    //otp or password verification
    try {
        const {email,password}=req.body;
        //check whether new user
        if(!user){
            return res.status(404).send({
                message:"user is not registered, please sign up first"
            })
        }
        const match= await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                message:"incorrect password"
            })
        }
        //token  jwt
        const token= await Jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            message:"successful customer login",
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"error in customer email login"
        })
    }
}

const registrationController=async(req,res)=>{
    //add customer information to database
    try {
        const {name,companyName,email,phoneNumber,password,designation}=req.body;
        //check existing user

        //register user
        const hashedPassword=hashPassword(password);

        //ADD TO DATABASE --------------------------------------
        

        res.status(201).send({
            message:"user registered successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'error in customer registration'
        });
    }
}



//partner login
const partnerLoginController=async(req,res)=>{
    //verify user id and password
    try {
        const {id,password}=req.body;
        //check whether partner or not
        if(!user){
            return res.status(404).send({
                message:"user is not registered, please sign up first"
            })
        }
        const match= await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                message:"incorrect password"
            })
        }
        //token  jwt
        const token= await Jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            message:"successful customer login",
            token
        });
        
    } catch (error) {
        console.log(error);
        res.send({
            message:"error in partner login"
        });
    }
}

// admin login
const adminLoginController=()=>{
    //verify user id and password
}

export default signupMobileController;
export {signupEmailController,mobileLoginController,emailLoginController,registrationController,partnerLoginController,adminLoginController};