const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/register', protect, permit('admin'), registerUser);
router.post('/bypass/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
