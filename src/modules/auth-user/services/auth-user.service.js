import { compareSync, hashSync } from "bcrypt";
import { usermodel } from "../../../DB/models/user.model.js";
import { typrOfOtp } from "../../../constants/constants.js";
import { emitter } from "../../../services/sent-email.service.js";
import {generateToken,verifyToken}from '../../../utils/token.utils.js'
import { v4 as uuidv4 } from "uuid";



export const signUpService=async(req,res)=>{
    const {name,email,password,gender,mobileNumber}=req.body
    const isEmail=await usermodel.findOne({email})
    if(isEmail){
        return res.status(400).json({message:'email is already exists'})
    }

    const otp=Math.floor(10000*Math.random()*900000).toString()
    const hashotp=hashSync(otp,+process.env.SALT)
    const otpExpires=new Date(Date.now() + 10*60*1000)

    const user=new usermodel({
        name,
        email,
        password,
        gender,
        mobileNumber,
        OTP:[
            {
                code:hashotp,
                type:typrOfOtp.CONFIRM_EMAIL,
                expiresIn:otpExpires
            }
        ]
    })
    await user.save()
    emitter.emit('sendEmail',{
        subject:'confirm your email',
        html:`<h1>${otp}</h1>`,
        to:email,
    })
    res.status(201).json({message:'signUp susseccfuly'})
}


export const confirmEmail=async(req,res)=>{
    const {otp,email}=req.body
    const user=await usermodel.findOne({
        email,
        isConfirmed:false,
        'OTP.type':"confirmEmail"
    })
    if(!user){
        return res.status(400).json({ message: "User not found or already verified" });
    }

    const userotp=user.OTP.filter(otbobj=>otbobj.type===typrOfOtp.CONFIRM_EMAIL)
    const lastconfirmEmailOtp=userotp.at(-1)


    if(!lastconfirmEmailOtp){
        return res.status(400).json({ message: "No valid OTP found" });
    }

    if(new Date()>lastconfirmEmailOtp.expiresIn){
        return res.status(400).json({ message: "OTP has expired, request a new one" });
    }

    const isvalidotb=compareSync(otp,lastconfirmEmailOtp.code)
    if(!isvalidotb){
        return res.status(400).json({ message: "Invalid OTP" });
    }

    await usermodel.findByIdAndUpdate(user._id,{
        isConfirmed:true
    })
    res.status(200).json({ message: "Email confirmed successfully" });
}


export const signInUser=async(req,res)=>{
    const {password,email}=req.body
    const user=await usermodel.findOne({email,isConfirmed:true})
    if(!user){
        return res.status(400).json({message:'email or password not valid'})
    }

    const ispassword=compareSync(password,user.password)
    if(!ispassword){
        return res.status(400).json({message:'email or password not valid'})
    }

    const accesstoken=generateToken({
        data:{_id:user._id,username:user.username},
        sk:process.env.JWT_ACCESS_TOKEN_SECRETKEY_LOGIN,
        options:{expiresIn:process.env.JWT_ACCESS_TOKEN_EXP_LOGIN,jwtid:uuidv4()}
    })

    const refreshtoken=generateToken({
        data:{_id:user._id,username:user.username},
        sk:process.env.JWT_REFRESH_TOKEN_SECRETKEY_LOGIN,
        options:{expiresIn:process.env.JWT_REFRESH_TOKEN_EXP_LOGIN,jwtid:uuidv4()}
    })

    res.status(200).json({message:'login susseccfully',accesstoken,refreshtoken})


}
