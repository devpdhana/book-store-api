import express from 'express';
import { body } from 'express-validator';
import { verifyToken, checkRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);

router.post('/',
  verifyToken,
  checkRole(['admin']),
  validate([
    body('title').trim().notEmpty(),
    body('author').trim().notEmpty(),
    body('price').isNumeric(),
    body('stock').isInt({ min: 0 }),
  ]),
  createBook
);

router.put('/:id',
  verifyToken,
  checkRole(['admin']),
  validate([
    body('title').trim().optional(),
    body('author').trim().optional(),
    body('price').isNumeric().optional(),
    body('stock').isInt({ min: 0 }).optional(),
  ]),
  updateBook
);

router.delete('/:id', verifyToken, checkRole(['admin']), deleteBook);

export default router;