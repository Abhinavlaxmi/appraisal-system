const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questions: { type: [String], required: true },
  title: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);