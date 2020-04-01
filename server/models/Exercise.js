const mongoose = require('mongoose');
const categories = ['Chest', 'Back', 'Shoulder', 'Leg', 'Abdominal', 'Biceps', 'Triceps', 'Full body'];
const levels = ['Beginner', 'Intermediate', 'Advanced']
const targets = ['Velocity', 'Strength', 'Volume', 'Endurance', 'Definition']

const ExerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: categories },
  level: { type: String, enum: levels },
  target: { type: String, enum: targets },
  moveType: String,
  description: String,
  time: Number, // minutes
  series: Number,
  reps: String,
  image: String,
  image2: String,
  video: String,
  creatorExerciseId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
