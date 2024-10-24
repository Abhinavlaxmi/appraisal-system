const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'peer', 'junior', 'user'], required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  peers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  juniors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;