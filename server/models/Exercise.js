const mongoose = require('mongoose');

const sports = ['Fitness', 'Boxing', 'HIIT', 'Core'];
const bodyPart = ['Chest', 'Back', 'Shoulder', 'Leg', 'Abdominal', 'Biceps', 'Triceps', 'Full body'];
const levels = ['Beginner', 'Intermediate', 'Advanced']
const targets = ['Strength', 'Volume', 'Definition', 'Endurance', 'Speed', 'Agility', 'Technique', 'Power', 'Footwork']
const times = [0.5, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 45];

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
