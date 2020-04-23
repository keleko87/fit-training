const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  weight: Number,
  height: Number,
  complexion: String,
  currentRoutine: { type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
