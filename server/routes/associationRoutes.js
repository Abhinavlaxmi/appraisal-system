const express = require('express');

const { protect } = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/roleMiddleware');
const { associationHandler, getAssociationHandler } = require('../controllers/associationController');

const router = express.Router();

router.post('/create', protect, permit('admin'), associationHandler);
router.get('/get-all', getAssociationHandler);

module.exports = router;
