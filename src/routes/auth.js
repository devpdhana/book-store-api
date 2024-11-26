import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register',
  validate([
    body('username').trim().isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ]),
  register
);

router.post('/login',
  validate([
    body('email').isEmail(),
    body('password').exists(),
  ]),
  login
);

export default router;