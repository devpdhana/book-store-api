import express from 'express';
import { body } from 'express-validator';
import { verifyToken, checkRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', checkRole(['admin']), getAllUsers);
router.get('/:id', getUserById);

router.put('/:id',
  checkRole(['admin']),
  validate([
    body('username').trim().optional(),
    body('email').isEmail().optional(),
    body('role').isIn(['user', 'admin']).optional(),
  ]),
  updateUser
);

router.delete('/:id', checkRole(['admin']), deleteUser);

export default router;