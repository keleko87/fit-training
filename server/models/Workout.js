const mongoose = require('mongoose');

const sports = ['Fitness', 'Boxing', 'HIIT', 'Core'];
const bodyPart = ['Chest', 'Back', 'Shoulder', 'Leg', 'Abdominal', 'Biceps', 'Triceps', 'Full body'];
const levels = ['Beginner', 'Intermediate', 'Advanced']
const targets = ['Strength', 'Volume', 'Definition', 'Endurance', 'Speed', 'Agility', 'Technique', 'Power', 'Footwork']

const WorkoutSchema = mongoose.Schema({
  name: { type: String, required: true },
  creatorWorkoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sport: { type: String, required: true, enum: sports },
  bodyPart: { type: String, enum: bodyPart },
  level: { type: String, enum: levels },
  target: { type: String, enum: targets },
  image: String,
  duration: Number, // minutes
  totalExercises: Number,
  exercises: [],
  musicList: []
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
