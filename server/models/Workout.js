const mongoose = require('mongoose');

const sports = ['Fitness', 'Boxing', 'HIIT', 'Core'];
const bodyPart = ['Chest', 'Back', 'Shoulder', 'Leg', 'Abdominal', 'Biceps', 'Triceps', 'Full body'];
const levels = ['Beginner', 'Intermediate', 'Advanced']
const targets = ['Strength', 'Volume', 'Definition', 'Endurance', 'Speed', 'Agility', 'Technique', 'Power', 'Footwork']

const WorkoutSchema = mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true, enum: sports },
  sportImageUrl: String,
  bodyPart: { type: String, enum: bodyPart },
  level: { type: String, enum: levels },
  target: { type: String, enum: targets },
  duration: Number, // minutes
  restBetweenExercise: Number, // minutes
  totalExercises: Number,
  creatorWorkoutId: { type: Object }, // { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
