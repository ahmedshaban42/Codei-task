import { Router } from "express";
const user=Router()

import { errorHandler } from "../../middleware/error-handeller.middleware.js";
import { validationMW } from "../../middleware/validation.middleware.js";
import {signUpService,confirmEmail,signInUser}from './services/auth-user.service.js'
import {signUpServiceSchema,signInUserSchema,confirmEmailSchema}from '../../validators/user-schema.js'

user.post('/api/signUpUser',
    errorHandler(validationMW(signUpServiceSchema)),
    errorHandler(signUpService)
)

user.put('/api/confirmEmail',
    errorHandler(validationMW(confirmEmailSchema)),
    errorHandler(confirmEmail)
)

user.post('/api/signInUser',
    errorHandler(validationMW(signInUserSchema)),
    errorHandler(signInUser)
)









export default user