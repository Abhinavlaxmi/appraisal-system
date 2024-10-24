const mongoose = require('mongoose');

const AppraisalSchema = new mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appraiser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['self', 'manager', 'peer', 'junior'], required: true },
  responses: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answer: { type: String, required: true },
  }],
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Appraisal', AppraisalSchema);