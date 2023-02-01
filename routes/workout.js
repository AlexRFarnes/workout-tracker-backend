const express = require('express');

const router = express.Router();

// Get all workouts
router.get('/', (req, res) => {
  res.json('Get all workouts');
});

// Get single workout
router.get('/:id', (req, res) => {
  res.json('Get single workout');
});

// Post a workout
router.post('/', (req, res) => {
  res.json('Create a workout');
});

// Update a workout
router.patch('/:id', (req, res) => {
  res.json('Update workout');
});

// Delete a workout
router.delete('/:id', (req, res) => {
  res.json('Delete workout');
});

module.exports = router;
