import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// desc Create a new exercise
// @route POST /api/exercises
// @access Private

export const createExercise = expressAsyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body

	if (!name || !times || !iconPath) {
		res.status(400)
		throw new Error('Please fill in all fields')
	}

	const exercise = await prisma.exercise.create({
		data: {
			name,
			times,
			iconPath
		}
	})

	res.json(exercise)
})

// desc Update exercise
// @route PUT /api/exercises/:id
// @access Private

export const updateExercise = expressAsyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body

	try {
		const exercise = await prisma.exercise.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				times,
				iconPath
			}
		})

		res.json(exercise)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})

export const deleteExercise = expressAsyncHandler(async (req, res) => {
	try {
		const exercise = await prisma.exercise.delete({
			where: {
				id: +req.params.id
			}
		})

		res.json({ message: 'Exercise deleted' })
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})

// desc Get all exercise
// @route GET /api/exercises
// @access Private

export const getAllExercises = expressAsyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})

	res.json(exercises)
})
