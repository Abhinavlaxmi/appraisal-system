const Question = require('../models/Question');

// Create a Question
const createQuestion = async (req, res) => {
  const { questionText, category } = req.body;

  if (!questionText) {
    return res.status(400).json({ message: 'Question text is required' });
  }

  const question = await Question.create({ questionText, category });

  res.status(201).json(question);
};

// Get All Questions
const getAllQuestions = async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
};

// Update a Question
const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { questionText, category } = req.body;

  const question = await Question.findById(id);

  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }

  question.questionText = questionText || question.questionText;
  question.category = category || question.category;

  await question.save();

  res.json(question);
};

// Delete a Question
const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }

  await question.remove();

  res.json({ message: 'Question removed' });
};

module.exports = { createQuestion, getAllQuestions, updateQuestion, deleteQuestion };