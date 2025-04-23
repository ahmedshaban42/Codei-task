import Joi from "joi";



export const CourseDataSchema={
    body:Joi.object({
        title:Joi.string().
        required()
        .messages({
            "string.base": " title must be a text.",
            "string.empty": " title is required and cannot be empty.",
            "any.required": " title is required."
        }),
        description:Joi.string().
        required()
        .messages({
            "string.base": " title must be a text.",
            "string.empty": " title is required and cannot be empty.",
            "any.required": " title is required."
        }),
        startDate: Joi.date().greater('now').required()
        .messages({
            "date.base": "Start date must be a valid date.",
            "date.greater": "Start date must be in the future.",
            "any.required": "Start date is required."
        }),
        endDate:Joi.date()
        .greater(Joi.ref('startDate'))
        .required()
        .messages({
            "date.base": "End date must be a valid date.",
            "date.greater": "End date must be after the start date.",
            "any.required": "End date is required."
        }),
        price: Joi.number().min(0).required().messages({
            "number.base": "Price must be a number.",
            "number.min": "Price cannot be negative.",
            "any.required": "Price is required."
        })
        
    })
}