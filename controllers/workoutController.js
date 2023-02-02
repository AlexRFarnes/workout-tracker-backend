const { json } = require('express');
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
    return res.status(404).json({ error: 'Workout could not be found' });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: 'Workout could not be found' });
  }

  res.status(200).json(workout);
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
    return res.status(404).json({ error: 'Workout could not be found' });
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

  const workout = await Workout.findByIdAndUpdate(id, { ...req.body });

  if (!workout) {
    return res.status(404).json({ error: 'Workout could not be updated' });
  }

  res.status(200).json(workout);
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
