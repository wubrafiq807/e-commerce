import express from 'express';
import {
     createOrder,
     getAllOrders ,
     getOrderById
    } from '../controllers/orderController';
import authenticateJWT from '../middleware/authMiddleware';

const router = express.Router();

// Route to create an order (authentication required)
router.post('/', authenticateJWT, createOrder);

// Route to get all orders (authentication required)
router.get('/', authenticateJWT, getAllOrders);

// Route to get orders by Id (authentication required)
router.get('/:id', authenticateJWT, getOrderById);

export default router;
