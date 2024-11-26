import express from 'express';
import { body } from 'express-validator';
import { verifyToken, checkRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  getAllOrders,
  createOrder,
  updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getAllOrders);

router.post('/',
  validate([
    body('bookId').isMongoId(),
    body('quantity').isInt({ min: 1 }),
  ]),
  createOrder
);

router.put('/:id',
  checkRole(['admin']),
  validate([
    body('status').isIn(['pending', 'completed', 'cancelled']),
  ]),
  updateOrderStatus
);

export default router;