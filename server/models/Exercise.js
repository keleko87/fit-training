const mongoose = require('mongoose');

const sports = ['Fitness', 'Boxing', 'HIIT', 'Core'];
const bodyPart = ['Chest', 'Back', 'Shoulder', 'Leg', 'Abdominal', 'Biceps', 'Triceps', 'Full body'];
const levels = ['Beginner', 'Intermediate', 'Advanced']
const targets = ['Strength', 'Volume', 'Definition', 'Endurance', 'Speed', 'Agility', 'Technique', 'Power', 'Footwork']

const ExerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: String, enum: sports },
  bodyPart: { type: String, enum: bodyPart },
  level: { type: String, enum: levels },
  target: { type: String, enum: targets },
  moveType: String,  // ??? Isometric, Aerobic
  description: String,
  time: Number, // seconds
  rest: Number, // seconds
  series: Number,
  reps: String,
  image: { type: Object },
  imageUrl: String,
  videoUrl: String,
  isWarmUp: Boolean,
  observations: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
