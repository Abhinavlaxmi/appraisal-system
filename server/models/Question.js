const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);