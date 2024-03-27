import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { calculateMinute } from '../calculate-minute.js'

// desc Get Workout Logs
// @route GET /api/workouts/log/:Id
// @access Private

export const getWorkoutLog = expressAsyncHandler(async (req, res) => {
	const workoutId = +req.params.id

	const workoutLogs = await prisma.workoutLog.findUnique({
		where: {
			id: workoutId
		},
		include: {
			workout: {
				include: {
					exercises: true
				}
			},
			exerciseLogs: {
				orderBy: {
					id: 'asc'
				},
				include: {
					times: true
				}
			}
		}
	})

	if (!workoutLogs) {
		res.status(404)
		throw new Error('Workout Log not found!')
	}

	const minutes = calculateMinute(workoutLogs.workout.exercises.length)

	res.json({ ...workoutLogs, minutes })
})
