const express = require('express');
const { body } = require('express-validator');
const {
  createGroup,
  getUserGroups,
  getGroupById,
  addMember,
} = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getUserGroups)
  .post(
    [body('name').trim().notEmpty().withMessage('Group name is required')],
    validate,
    createGroup
  );

router.route('/:id')
  .get(getGroupById);

router.route('/:id/members')
  .post(
    [body('userId').notEmpty().withMessage('User ID is required')],
    validate,
    addMember
  );

module.exports = router;
