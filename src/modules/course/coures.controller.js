import { Router } from "express";
const Course=Router()

import {authorizationMiddleware,authenticationMiddleware}from '../../middleware/authentication.middleware.js'
import {errorHandler}from '../../middleware/error-handeller.middleware.js'
import { multerCloud } from "../../middleware/multer.middleware.js";
import{addNewCourse,getAllCourses,getCourseById,updateCourse,deleteCourse}from './service/course.service.js'
import { DocumentExtensions } from "../../constants/constants.js";
import { CourseDataSchema } from "../../validators/course.schema.js";
import {validationMW}from '../../middleware/validation.middleware.js'






Course.post('/api/addNewCourse',
    errorHandler(authenticationMiddleware()),
    errorHandler(authorizationMiddleware('user')),
    multerCloud(DocumentExtensions).single('image'),
    errorHandler(validationMW(CourseDataSchema)),
    errorHandler(addNewCourse)
)


Course.get('/api/courses',
    errorHandler(getAllCourses)
)


Course.get('/api/courses/:id',
    errorHandler(getCourseById)
)



Course.put('/api/courses/:id',
    errorHandler(authenticationMiddleware()),
    errorHandler(authorizationMiddleware('user')),
    multerCloud(DocumentExtensions).single('image'),
    errorHandler(validationMW(CourseDataSchema)),
    errorHandler(updateCourse)
)


Course.delete('/api/courses/:id',
    errorHandler(authenticationMiddleware()),
    errorHandler(authorizationMiddleware('user')),
    errorHandler(deleteCourse)
)


export default Course