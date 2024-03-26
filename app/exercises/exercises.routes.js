import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	createExercise,
	deleteExercise,
	getAllExercises,
	updateExercise
} from './exercises.controller.js'
import { createNewExerciseLog } from './log/exercise-log.controller.js'

import {
	updateCompleteExerciseLog,
	updateExerciseLogTime
} from './log/update-exercise-log.controller.js'

import { getExerciseLog } from './log/get-exercise-log.controller.js'

const router = express.Router()

router.route('/').post(protect, createExercise).get(protect, getAllExercises)

router
	.route('/:exerciseId')
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)

router
	.route('/log/:exerciseId')
	.post(protect, createNewExerciseLog)
	.get(protect, getExerciseLog)

router
	.route('/log/complete/:exerciseId')
	.patch(protect, updateCompleteExerciseLog)

router.route('/log/time/:exerciseId').put(protect, updateExerciseLogTime)

export default router
