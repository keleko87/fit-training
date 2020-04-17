const mongoose = require('mongoose');
const { sports, bodyPart, levels, targets } = require('../constants/constants');

const WorkoutSchema = mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true, enum: sports },
  sportImageUrl: String,
  bodyPart: { type: String, enum: bodyPart },
  level: { type: String },
  target: { type: String, enum: targets },
  duration: Number, // minutes
  restBetweenExercise: Number, // minutes
  totalExercises: Number,
  creatorWorkoutId: { type: Object }, // { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  exercises: [],
  musicList: [],

  // Workout GO DATA
  userId: { type: Object, required: true }, // { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: String, required: true } ,
  endDate: { type: String, required: true }
}, {
  timestamps: {
    createdAt: "created_at",
    endedAt: "ended_at"
  }
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
