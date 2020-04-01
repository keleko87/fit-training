const mongoose = require('mongoose');
const types = ['Fitness', 'Boxing', 'HIIT', 'Core'];

const WorkoutSchema = mongoose.Schema({
  name: { type: String, required: true },
  creatorWorkoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true, enum: types },
  target: String,
  image: String,
  duration: Number, // minutes
  totalExercises: Number,
  exercises: [],
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
