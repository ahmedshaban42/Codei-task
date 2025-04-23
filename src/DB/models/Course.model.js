import mongoose from "mongoose";

export const courseSchema=new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        image:{
            secure_url: { type: String, default: null },
            public_id: { type: String, default: null }
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        price: {
            type: Number,
            required: true
        }
    },
    {timestamps:true}
)

export const courseModel=mongoose.models.Course ||mongoose.model('Course',courseSchema)