import express, { json } from 'express'
import path from 'path'
import { config } from 'dotenv'
config({path:path.resolve(`src/config/.${process.env.NODE_ENV}.env`)})
import {connection}from './DB/conection.js'
import { routerhandellar } from './utils/router-handrller.utils.js'




export const bootstrab=async()=>{
    const app=express()
    app.use(express.json())
    const port=process.env.PORT
    await connection()
    routerhandellar(app,express)










    
    const server=app.listen(port,()=>{
        console.log(`server work in port ${port} successfuly` )
    })
}