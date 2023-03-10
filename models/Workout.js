const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    loadUnits: {
      type: String,
      required: true,
      enum: ['kg', 'lbs'],
    },
    reps: { type: Number, required: true },
    series: { type: Number, required: true },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Workout', workoutSchema);
