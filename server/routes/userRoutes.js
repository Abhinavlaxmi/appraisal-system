const express = require('express');
const { mapParticipants, getAllUsers } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/map', protect, permit('admin'), mapParticipants);
router.get('/', protect, permit('admin'), getAllUsers);

module.exports = router;
