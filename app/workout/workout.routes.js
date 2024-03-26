import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	createWorkout,
	deleteWorkout,
	getAllWorkouts,
	getWorkout,
	updateWorkout
} from './workout.controller.js'

const router = express.Router()

router.route('/').get(protect, getAllWorkouts).post(protect, createWorkout)

router
	.route('/:id')
	.get(protect, getWorkout)
	.put(protect, updateWorkout)
	.delete(protect, deleteWorkout)

export default router
