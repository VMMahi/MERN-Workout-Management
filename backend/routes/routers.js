const express = require('express')
const Workout = require('../models/workoutModel')
const {createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout} = require('../controller/workoutController')

const router = express.Router()
//get all workouts
router.get('/', getWorkouts)

//post a new workout document
router.post('/', createWorkout)

//get a single workout, here id is variable
router.get('/:id',getWorkout)

//delete a workout
router.delete('/:id', deleteWorkout)

//update workout
router.patch('/:id', updateWorkout)

module.exports = router