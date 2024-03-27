import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { calculateMinute } from './calculate-minute.js'

// desc Get workout
// @route GET /api/workouts/:id
// @access Private

export const getWorkout = expressAsyncHandler(async (req, res) => {
	const workout = await prisma.workout.findMany({
		where: {
			id: +req.params.id
		},
		include: {
			exercises: true
		}
	})

	console.log(workout[0].exercises.length)

	const minutes = calculateMinute(workout[0].exercises.length)

	if (!workout) {
		res.status(404)
		throw new Error('Workout not found')
	}

	res.json({ ...workout, minutes: minutes })
})

// desc Get all workouts
// @route GET /api/workouts
// @access Private

export const getAllWorkouts = expressAsyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			exercises: true
		}
	})

	if (!workouts) {
		res.status(404)
		throw new Error('No workouts found')
	}

	console.log(workouts.exercises)

	res.json(workouts)
})

// desc Create a new workout
// @route POST /api/workouts
// @access Private

export const createWorkout = expressAsyncHandler(async (req, res) => {
	const { name, exercisesIds } = req.body

	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exercisesIds.map(id => ({ id: +id }))
			}
		},
		include: {
			exercises: true
		}
	})

	if (!workout) {
		res.status(400)
		throw new Error('Invalid workout data')
	}

	res.json(workout)
})

// desc Update workout
// @route PUT /api/workouts/:id
// @access Private

export const updateWorkout = expressAsyncHandler(async (req, res) => {
	const { name, exercisesIds } = req.body

	console.log(exercisesIds, name)

	try {
		const workout = await prisma.workout.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				exercises: {
					set: exercisesIds.map(id => ({ id: +id }))
				}
			}
		})

		res.json(workout)
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
})

// desc Delete workout
// @route DELETE /api/workouts/:id
// @access Private

export const deleteWorkout = expressAsyncHandler(async (req, res) => {
	try {
		const workout = await prisma.workout.delete({
			where: {
				id: +req.params.id
			}
		})

		res.json({ message: 'Workout deleted' })
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
})
