const mongoose = require('mongoose');
const Workout = require('../models/Workout');

const getAllWorkouts = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const workouts = await Workout.find({ userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.body;

  // Validation
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: 'Workout not found.' });
  }

  try {
    const workout = await Workout.findOne({ _id: id, userId }); // Returns a query

    // Check if the query is empty, then no workout was found
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found.' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createWorkout = async (req, res) => {
  const { title, load, loadUnits, series, reps } = req.body;
  const { _id: userId } = req.user;

  // Validations
  const emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }

  if (!series) {
    emptyFields.push('series');
  }

  if (!reps) {
    emptyFields.push('reps');
  }

  if (!loadUnits) {
    emptyFields.push('loadUnits');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill the required fields.', emptyFields });
  }

  if (!['kg', 'lbs'].includes(loadUnits)) {
    return res
      .status(400)
      .json({ error: 'Please select a valid load unit (kg, lbs).' });
  }

  try {
    const workout = await Workout.create({
      title,
      load,
      loadUnits,
      series,
      reps,
      userId,
    }); // returns a promise

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  // Validations
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: 'Workout not found.' });
  }

  const { title, load, loadUnits, series, reps } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }

  if (!series) {
    emptyFields.push('series');
  }

  if (!reps) {
    emptyFields.push('reps');
  }

  if (!loadUnits) {
    emptyFields.push('loadUnits');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill the required fields.', emptyFields });
  }

  if (!['kg', 'lbs'].includes(loadUnits)) {
    return res
      .status(400)
      .json({ error: 'Please select a valid load unit (kg, lbs).' });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id, userId },
      {
        ...req.body,
      }
    ); // Returns a query

    // Check if the query is empty, then no workout was found
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found.' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  // Validation
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: 'Workout not found.' });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id, userId }); // Returns a query

    // Check if the query is empty, then no workout was found
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found.' });
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
