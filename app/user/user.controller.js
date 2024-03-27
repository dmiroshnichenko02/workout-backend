import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.util.js'

// desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = expressAsyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: UserFields
	})

	const minutes = await prisma.exerciseLog.count({
		where: {
			userId: req.user.id,
			isCompleted: true
		}
	})

	const kgs = await prisma.exerciseTime.aggregate({
		where: {
			exerciseLog: {
				userId: req.user.id
			},
			isCompleted: true
		},
		_sum: {
			weight: true
		}
	})

	const workouts = await prisma.exerciseLog.count({
		where: {
			userId: req.user.id,
			isCompleted: true
		}
	})

	// minutes, workouts, weight

	res.json({
		...user,
		statistics: [
			{ label: 'Minutes', value: Math.ceil(minutes * 3.7) },
			{ label: 'Workouts', value: workouts },
			{ label: 'Kilograms', value: kgs._sum.weight || 0 }
		]
	})
})
