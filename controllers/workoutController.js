const getAllWorkouts = (req, res) => {
  res.json('Get all workouts');
};

const getSingleWorkout = (req, res) => {
  res.json('Get single workout');
};

const createWorkout = (req, res) => {
  res.json('Create a workout');
};

const updateWorkout = (req, res) => {
  res.json('Update workout');
};

const deleteWorkout = (req, res) => {
  res.json('Delete workout');
};

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
