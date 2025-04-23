import { cloudinary } from "../../../config/cloudinary.config.js"
import { courseModel } from "../../../DB/models/Course.model.js"




export const addNewCourse=async(req,res)=>{
    const {title,description,startDate,endDate,price}=req.body
    const {file}=req
    if(!file){
        return res.status(400).json({message:'no file uploaded'})
    }
    const {secure_url,public_id}=await cloudinary().uploader.upload(file.path,{
        folder:`${process.env.CLOUDINARY_FOLDER}/course/image`
    })
    const course=await courseModel.create(
        {
            title,
            description,
            startDate,
            endDate,
            price,
            image:{
                secure_url,
                public_id
            }
        }
    )
    res.status(201).json({ message: 'Course added successfully', course });

}


export const getAllCourses=async(req,res)=>{
    const Courses=await courseModel.find()
    res.status(201).json({ message: 'Courses fetched successfully', Courses });
}


export const getCourseById=async(req,res)=>{{
    const {id}=req.params
    const course=await courseModel.findById(id)
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    res.status(201).json({ message: 'Course fetched successfully', course });
}}

export const updateCourse=async(req,res)=>{
    const {id}=req.params
    const {title,description,startDate,endDate,price}=req.body
    const {file}=req

    const course=await courseModel.findById(id)
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if(title) course.title=title
    if(description)course.description=description
    if(startDate)course.startDate=startDate
    if(endDate)course.endDate=endDate
    if(price)course.price=price

    if(file){

        if(course.image?.public_id){
            await cloudinary().uploader.destroy(course.image.public_id)
        }


        const {secure_url,public_id}=await cloudinary().uploader.upload(file.path,{
            folder:`${process.env.CLOUDINARY_FOLDER}/course/image`
        })
        course.image={secure_url,public_id}
    }
    await course.save()

    res.status(200).json({ message: "Course updated successfully", course });

}

export const deleteCourse=async(req,res)=>{
    const {id}=req.params
    const course=await courseModel.findById(id)
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if(course.image?.public_id){
        await cloudinary().uploader.destroy(course.image.public_id)
    }
    await courseModel.deleteOne({_id:id})
    res.status(200).json({ message: "Course deleted successfully" });
}