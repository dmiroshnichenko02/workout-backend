import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// desc Update Exercise time
// @route PUT /api/exercises/log/time/:exerciseId
// @access Private

export const updateExerciseLogTime = expressAsyncHandler(async (req, res) => {
	const { weight, repeat, isCompleted } = req.body

	try {
		const exerciseLogTime = await prisma.exerciseTime.update({
			where: {
				id: +req.params.exerciseId
			},
			data: {
				weight,
				repeat,
				isCompleted
			}
		})

		res.json(exerciseLogTime)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise log time not found')
	}
})

// desc Update status complete exercise
// @route PATCH /api/exercises/complete/:exerciseId
// @access Private

export const updateCompleteExerciseLog = expressAsyncHandler(
	async (req, res) => {
		const { isCompleted } = req.body

		const exerciseId = +req.params.exerciseId

		console.log(req.params.exerciseId)

		try {
			const exerciseLog = await prisma.exerciseLog.update({
				where: {
					id: exerciseId
				},
				data: {
					isCompleted
				},
				include: {
					workoutLog: true,
					exercise: true,
					times: true
				}
			})

			res.json(exerciseLog)
		} catch (error) {
			res.status(404)
			throw new Error('Exercise log not found')
		}
	}
)
