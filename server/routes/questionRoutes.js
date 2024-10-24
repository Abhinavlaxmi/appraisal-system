const express = require('express');
const {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Admin-only routes
router.post('/', protect, permit('admin'), createQuestion);
router.get('/', protect, permit('admin', 'manager', 'peer', 'junior'), getAllQuestions);
router.put('/:id', protect, permit('admin'), updateQuestion);
router.delete('/:id', protect, permit('admin'), deleteQuestion);

module.exports = router;
