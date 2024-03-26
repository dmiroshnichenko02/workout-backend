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

	res.json(user)
})
