import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	createExercise,
	deleteExercise,
	getAllExercises,
	updateExercise
} from './exercises.controller.js'

const router = express.Router()

router.route('/').post(protect, createExercise).get(protect, getAllExercises)

router
	.route('/:id')
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)

export default router
