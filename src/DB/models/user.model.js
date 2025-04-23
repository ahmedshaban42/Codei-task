
import mongoose from "mongoose";
import { gender,typrOfOtp } from "../../constants/constants.js";
import { hashSync } from "bcrypt";
import { Decryption,Encryption } from "../../utils/encryption.utils.js";


export const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            lowercase:true,
            trim:true,
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String
        },
        gender:{
            type:String,
            enum:Object.values(gender),
            default:gender.NITSPECIFIED
        },
        mobileNumber: {
            type: String,
            trim: true
        },
        isConfirmed: {
            type: Boolean,
            default: false
        },
        OTP: [
            {
                code: { type: String, required: true },
                type: {
                    type: String,
                    enum:Object.values(typrOfOtp),
                    required: true
                },
                expiresIn: { type: Date, required: true }
            }
        ],
        role:{
            type:String,
            default:'user'
        }

    },
    {
        timestamps:true,
    })

    userSchema.pre('save',async function(next){
        if(this.isModified('password')){
            this.password=hashSync(this.password,+process.env.SALT)
        }

        if(this.isModified('mobileNumber')){
            this.mobileNumber=await Encryption({value:this.mobileNumber,secretkey:process.env.ENCRYPTED_KEY_PHONE})
        }
        next()
    })


    export const usermodel=mongoose.models.user || mongoose.model('user',userSchema)