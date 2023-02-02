const mongoose = require('mongoose');
const Workout = require('../models/Workout');

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: 'Workout was not found' });
  }

  try {
    const workout = await Workout.findById(id); // Returns a query

    // Check if the query is empty, if so then no workout was found
    if (!workout) {
      return res.status(404).json({ error: 'Workout was not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createWorkout = async (req, res) => {
  const { title, load, loadUnits, series, reps } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }

  if (!load) {
    emptyFields.push('load');
  }

  if (!series) {
    emptyFields.push('series');
  }

  if (!reps) {
    emptyFields.push('reps');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'All fields are required', emptyFields });
  }

  if (!['kg', 'lbs'].includes(loadUnits)) {
    return res
      .status(400)
      .json({ error: 'Please select a valid load unit (kg, lbs)' });
  }

  try {
    const workout = await Workout.create({
      title,
      load,
      loadUnits,
      series,
      reps,
    });

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: 'Workout was not found' });
  }

  const { title, load, loadUnits, series, reps } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }

  if (!load) {
    emptyFields.push('load');
  }

  if (!series) {
    emptyFields.push('series');
  }

  if (!reps) {
    emptyFields.push('reps');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'All fields are required', emptyFields });
  }

  if (!['kg', 'lbs'].includes(loadUnits)) {
    return res
      .status(400)
      .json({ error: 'Please select a valid load unit (kg, lbs)' });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(id, { ...req.body }); // Returns a query

    // Check if the query is empty, if so then no workout was found
    if (!workout) {
      return res.status(404).json({ error: 'Workout was not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: 'Workout was not found' });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id); // Returns a query

    // Check if the query is empty, if so then no workout was found
    if (!workout) {
      return res.status(404).json({ error: 'Workout was not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
