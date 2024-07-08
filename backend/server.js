const express = require('express')
require('dotenv').config()
const workoutRouter = require('./routes/routers')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

// app.get("/message",(req,res)=> {
//     res.json({msg:"Welcome to the app"})
// }) removed because now you can use the router to set functionalities to all the routes

//router
app.use('/api/workouts', workoutRouter)

mongoose.connect(process.env.MONGO_URI).then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log("Connected to Database gym")
        console.log("Listening on port ",process.env.PORT)
    })
})

// app.listen(process.env.PORT, ()=>{
//     console.log("Listening on port ",process.env.PORT)
// })