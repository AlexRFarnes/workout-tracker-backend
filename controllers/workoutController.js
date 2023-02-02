const Workout = require('../models/Workout');

const getAllWorkouts = async (req, res) => {
  res.json({ msg: 'GET all workouts', workouts });
};

const getSingleWorkout = async (req, res) => {
  res.json({ msg: 'GET single workout' });
};

const createWorkout = async (req, res) => {
  const { title, load, loadUnits, series, reps } = req.body;

  try {
    const workout = await Workout.create({
      title,
      load,
      loadUnits,
      series,
      reps,
    });

    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  res.json({ msg: 'UPDATE workout' });
};

const deleteWorkout = async (req, res) => {
  res.json({ msg: 'DELETE workout' });
};

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
