const mongoose = require('mongoose');

const RoutineSchema = mongoose.Schema({
  name: { type: String, required: true },
  creatorRoutineId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: String,
  target: String,
  startDate: Date,
  endDate: Date,
  totalDays: Number,
  workoutsPerWeek: Number,
  finish: Boolean,
  workouts: Array,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Routine = mongoose.model('Routine', RoutineSchema);

module.exports = Routine;
