import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// desc Update status complete workout
// @route PATCH /api/workouts/complete/:id
// @access Private

export const updateCompleteWorkoutLog = expressAsyncHandler(
	async (req, res) => {
		const { isCompleted } = req.body

		const workoutId = +req.params.id

		try {
			const workoutLog = await prisma.workoutLog.update({
				where: {
					id: workoutId
				},
				data: {
					isCompleted
				}
			})

			res.json(workoutLog)
		} catch (error) {
			res.status(404)
			throw new Error('Workout log not found')
		}
	}
)
