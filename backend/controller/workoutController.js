const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all Workouts
const getWorkouts = async (req,res)=> {
    const workouts = await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}

//create/post a workout
const createWorkout = async (req,res)=> {
    const {title,reps,load} = req.body

    const emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error:'Please fill in all teh fields', emptyFields})
    }

    try{
        const workout = await Workout.create({title,reps,load})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//get a workout by id 
const getWorkout = async (req,res)=> {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error:"No such workout found "})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error:"No such workout found"})
    }
    res.status(200).json(workout)
}

//delete a workout using id
const deleteWorkout = async (req,res)=> {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout found'})
    }

    const workout = await Workout.findOneAndDelete({_id:id})

    if(!workout){
        return res.status(404).json({error:'No such workout found'})
    }

    res.status(200).json(workout)
}

//updating a workout using id
const updateWorkout = async (req,res)=> {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such workout found'})
    }

    const workout = await Workout.findByIdAndUpdate({_id:id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(404).json({error:'No such workout found'})
    }
    
    res.status(200).json(workout)
}



module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}