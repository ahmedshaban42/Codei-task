import jwt from 'jsonwebtoken'
import {blacklistmodel} from '../DB/models/blacklist.model.js'
import { usermodel } from '../DB/models/user.model.js'

export const authenticationMiddleware=()=>{
    return async(req,res,next)=>{
        
            const {accesstoken}=req.headers
            if(!accesstoken){
                return res.status(400).json({message:'plasse enter access token'})
            }
            const decodeddata=jwt.verify(accesstoken,process.env.JWT_ACCESS_TOKEN_SECRETKEY_LOGIN)

            const user=await usermodel.findById(decodeddata._id,'-password -__v')
            if(!user){
                return res.status(400).json({message:'user not found plase signUp'})
            }
            const isblacklistedtoken=await blacklistmodel.findOne({tokenid:decodeddata.jti})

            if(isblacklistedtoken){
                return res.status(400).json({message:'plasse login frist'})
            }
            req.loggedinuser=user
            req.userToken={tokenid:decodeddata.jti,expirydata:decodeddata.exp}
            next()
        
    }
}

export const authorizationMiddleware=(allowroles)=>{
    return async(req,res,next)=>{
        
            const {role}=req.loggedinuser
            const isrloeallowed=allowroles.includes(role)
            if(!isrloeallowed){
                return res.status(409).json({message:'unauthorized'})
            }
            next()
        
    }
}