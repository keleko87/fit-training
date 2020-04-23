const mongoose = require('mongoose');
const { sports, bodyPart, levels, targets } = require('../constants/constants');

const WorkoutGoSchema = mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true, enum: sports },
  bodyPart: { type: String, enum: bodyPart },
  level: { type: String },
  target: { type: String, enum: targets },
  duration: Number, // minutes
  exercises: [],
  musicList: [],

  // Workout GO DATA
  restBetweenExercise: Number, // minutes
  series: Number,
  userId: { type: Object, required: true }, // { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: String, required: true } ,
  endDate: { type: String },
  finish: { type: Boolean, requied: true }
}, {
  timestamps: {
    createdAt: "created_at",
    endedAt: "ended_at"
  }
});

const Workout = mongoose.model('WorkoutGo', WorkoutGoSchema);

module.exports = Workout;
