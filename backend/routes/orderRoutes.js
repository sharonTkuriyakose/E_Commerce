import express from 'express';
import { addOrderItems, getOrderById, getMyOrders, getOrders, updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, admin, optionalProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default router;
