const User = require('../models/User');

const mapParticipants = async (req, res) => {
  const { participantId, managerId, peersIds, juniorsIds } = req.body;

  const participant = await User.findById(participantId);
  const manager = await User.findById(managerId);
  
  if (!participant || !manager) {
    return res.status(404).json({ message: 'Participant or manager not found' });
  }

  participant.manager = managerId;
  participant.peers = peersIds || [];
  participant.juniors = juniorsIds || [];

  await participant.save();

  res.json(participant);
};

const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
};

module.exports = { mapParticipants, getAllUsers };