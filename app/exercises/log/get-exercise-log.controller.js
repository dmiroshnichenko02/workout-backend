import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { addPrevValues } from './add-prev-values.util.js'
// desc Get Exercise Logs
// @route GET /api/exercises/log/:exerciseId
// @access Private

export const getExerciseLog = expressAsyncHandler(async (req, res) => {
	const exerciseId = +req.params.exerciseId

	const exerciseLogs = await prisma.exerciseLog.findUnique({
		where: {
			id: exerciseId
		},
		include: {
			exercise: true,
			times: true
		}
	})

	if (!exerciseLogs) {
		res.status(404)
		throw new Error('Exercise Log not found!')
	}

	const prevExerciseLog = await prisma.exerciseLog.findFirst({
		where: {
			id: exerciseLogs.id,
			userId: req.user.id,
			isCompleted: true
		},
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			times: true
		}
	})

	const newTimes = addPrevValues(exerciseLogs, prevExerciseLog)

	res.json({ ...exerciseLogs, times: newTimes })
})
