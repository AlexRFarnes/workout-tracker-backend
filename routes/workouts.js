const express = require('express');
const {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// require auth for all workout routes
router.use(authenticate);

// GET all workouts
router.get('/', getAllWorkouts);

// POST a workout
router.post('/', createWorkout);

// GET a single workout
router.get('/:id', getSingleWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

module.exports = router;
