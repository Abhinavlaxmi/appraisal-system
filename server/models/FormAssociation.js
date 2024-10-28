const mongoose = require('mongoose');

const AssociationSchema = new mongoose.Schema({
  questionForm: { type: Object, required: true },
  assignedTo: { type: Object, required: true },
}, { timestamps: true });

module.exports = mongoose.model('FormAssociation', AssociationSchema);