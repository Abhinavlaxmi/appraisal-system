const Appraisal = require('../models/Appraisal');
const User = require('../models/User');
const Question = require('../models/Question');

// Create an Appraisal
const createAppraisal = async (req, res) => {
  const { participantId, type, responses } = req.body;
  const appraiserId = req.user._id;

  if (!['self', 'manager', 'peer', 'senior', 'junior'].includes(type)) {
    return res.status(400).json({ message: 'Invalid appraisal type' });
  }

  const participant = await User.findById(participantId);
  if (!participant) {
    return res.status(404).json({ message: 'Participant not found' });
  }

  if (type !== 'self') {
    if (type === 'manager') {
      if (!participant.manager.equals(appraiserId)) {
        return res.status(403).json({ message: 'Not authorized to appraise this participant' });
      }
    }
  }

  const questionIds = responses.map(r => r.question);
  const questions = await Question.find({ _id: { $in: questionIds } });

  if (questions.length !== responses.length) {
    return res.status(400).json({ message: 'Some questions are invalid' });
  }

  const appraisal = await Appraisal.create({
    participant: participantId,
    appraiser: appraiserId,
    type,
    responses,
  });

  res.status(201).json(appraisal);
};

const getAllAppraisals = async (req, res) => {
  const appraisals = await Appraisal.find()
    .populate('participant', 'name email')
    .populate('appraiser', 'name email')
    .populate('responses.question', 'questionText');

  res.json(appraisals);
};

const getAppraisalsForUser = async (req, res) => {
  const userId = req.user._id;
  const role = req.user.role;

  let appraisals;

  switch (role) {
    case 'admin':
      appraisals = await Appraisal.find()
        .populate('participant', 'name email')
        .populate('appraiser', 'name email')
        .populate('responses.question', 'questionText');
      break;
    case 'manager':
      // Get self appraisals and those submitted by manager for their participants
      appraisals = await Appraisal.find({
        $or: [
          { appraiser: userId }, // Appraisals submitted by manager
          { participant: userId, type: 'self' }, // Self appraisals
        ],
      })
        .populate('participant', 'name email')
        .populate('appraiser', 'name email')
        .populate('responses.question', 'questionText');
      break;
    case 'peer':
    case 'junior':
      // Get only the appraisals submitted by peers/juniors
      appraisals = await Appraisal.find({ appraiser: userId })
        .populate('participant', 'name email')
        .populate('appraiser', 'name email')
        .populate('responses.question', 'questionText');
      break;
    default:
      return res.status(403).json({ message: 'Forbidden' });
  }

  res.json(appraisals);
};

module.exports = { createAppraisal, getAllAppraisals, getAppraisalsForUser };
