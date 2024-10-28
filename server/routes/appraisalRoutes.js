const express = require('express');
const {
  createAppraisal,
  getAllAppraisals,
  getAppraisalsForUser,
} = require('../controllers/appraisalController');
const { protect } = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', protect, permit('self', 'manager', 'peer', 'senior', 'junior'), createAppraisal);
router.get('/', protect, permit('admin', 'manager', 'peer', 'senior', 'junior'), getAppraisalsForUser);

router.get('/all', protect, permit('admin'), getAllAppraisals);

module.exports = router;