import Joi from "joi";
import { gender } from "../constants/constants.js";
export const signUpServiceSchema={
    body:Joi.object({
        name:Joi.string()
        .required()
        .max(30)
        .min(3)
        .trim()
        .messages({
            "string.base": " name must be a text.",
            "string.empty": " name is required and cannot be empty.",
            "string.min": " name must be at least 3 characters long.",
            "string.max": " name must not exceed 30 characters.",
            "any.required": " name is required."
        }),

        email:Joi.string()
        .email({tlds:{allow:['com']}})
        .required()
        .messages({
            "string.base": "Email must be a valid text.",
                "string.empty": "Email is required and cannot be empty.",
                "string.email": "Invalid email format. Make sure it's a valid email address.",
                "any.required": "Email is required.",
                "string.email.tlds": "Only '.com' domains are allowed.",
        }),
        password:Joi.string()
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/)
        .messages(
            {
                "string.pattern.base":"password must be contain 8 characters at least and contain uppercase and louercace "
            }
        ),
        confirmPassword:Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            "any.only":"passwoed and confirm password is not match"
        }),
        mobileNumber:Joi.string()
        .required()
        .max(11)
        .pattern(/^[0-9]{11}$/)
        .messages({
            "string.base": "Mobile number must be a valid text.",
            "string.empty": "Mobile number is required and cannot be empty.",
            "string.max": "Mobile number must not exceed 11 digits.",
            "string.pattern.base": "Mobile number must contain exactly 11 digits.",
            "any.required": "Mobile number is required."
        }),
        gender:Joi.string()
        .required()
        .valid(...Object.values(gender))
        .messages(
            {
                "any.required": "Gender is required.",
                "any.only": `Gender must be one of: ${Object.values(gender).join(", ")}.`
            }
        ),
    })
}

export const confirmEmailSchema={
    body:Joi.object({
        otp:Joi.string()
        .required()
        .messages(
            {
                "string.base": "otp must be a valid text.",
                "string.empty": "otp is required and cannot be empty.",
            }
        ),

        email:Joi.string()
        .email({
            tlds:{
                allow:['com'],
                deny:['net','org']
            },
            maxDomainSegments:2,
            multiple:true,
            separator:'&'
        })
        .required().messages(
            {
                "string.base": "Email must be a valid text.",
                "string.empty": "Email is required and cannot be empty.",
                "string.email": "Invalid email format. Make sure it's a valid email address.",
                "any.required": "Email is required.",
                "string.email.tlds": "Only '.com' domains are allowed.",
                "string.email.maxDomainSegments": "Invalid email domain format."
            }
        ),
    }),
    
}

export const signInUserSchema={
    body:Joi.object({
        email:Joi.string()
        .email({tlds:{allow:['com']}})
        .required()
        .messages({
            "string.base": "Email must be a valid text.",
                "string.empty": "Email is required and cannot be empty.",
                "string.email": "Invalid email format. Make sure it's a valid email address.",
                "any.required": "Email is required.",
                "string.email.tlds": "Only '.com' domains are allowed.",
        }),
        password:Joi.string()
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/)
        .messages(
            {
                "string.pattern.base":"password must be contain 8 characters at least and contain uppercase and louercace "
            }
        ),
    })
}
