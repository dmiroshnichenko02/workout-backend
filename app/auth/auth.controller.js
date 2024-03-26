import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.util.js'
import { generateToken } from './generate-token.js'
// @desc Auth user
// @route POST /api/auth/login
// @access Public
export const authUser = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body

	const authUser = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (!authUser) {
		res.status(400)
		throw new Error('Invalid credentials')
	}

	const isValidPassword = await verify(authUser.password, password)

	if (authUser && isValidPassword) {
		const token = generateToken(authUser.id)
		res.json({ authUser, token })
	} else {
		res.status(400)
		throw new Error('Invalid credentials')
	}
})

// @desc Register user
// @route POST /api/auth/register
// @access Public
export const registerUser = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body

	const isHaveUser = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.person.fullName()
		},
		select: UserFields
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})
