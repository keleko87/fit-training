const mongoose = require('mongoose');
const { sports, bodyPart, levels, targets } = require('../config/constants');

const ExerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: String, enum: sports },
  bodyPart: { type: String, enum: bodyPart },
  level: { type: String, enum: levels },
  target: { type: String, enum: targets },
  moveType: String,  // Isometric, Aerobic
  description: String,
  observations: String,
  time: Number, // minutes
  rest: Number, // minutes
  series: Number,
  reps: Number,
  image: { type: Object },
  imageUrl: String,
  videoUrl: String,
  isWarmUp: Boolean
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
