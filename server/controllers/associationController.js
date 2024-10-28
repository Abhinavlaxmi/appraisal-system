const Association = require('../models/FormAssociation');

// Create a Question
const associationHandler = async (req, res) => {
  const { assignedTo, questionForm } = req.body;

  if (!assignedTo || !questionForm ) {
    return res.status(400).json({ message: 'Question text is required' });
  }

  const formAssociation = await Association.create({ assignedTo, questionForm });

  res.status(201).json(formAssociation);
};

const getAssociationHandler = async (req, res) => {
    
  
    const formAssociation = await Association.find({ });
  
    res.status(200).json(formAssociation);
  };


module.exports = { associationHandler, getAssociationHandler };