import {globalhandelrMW}from '../middleware/error-handeller.middleware.js'
import userController from '../modules/auth-user/auth-user.controller.js'
import CourseController from '../modules/course/coures.controller.js'
export const routerhandellar=(app,express)=>{







    app.use('/user',userController)
    app.use('/course',CourseController)
    app.get('/',async(req,res)=>{res.status(200).json({message:"app work done"})})
    app.use(globalhandelrMW)
}