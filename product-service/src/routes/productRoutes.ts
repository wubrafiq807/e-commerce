import express from 'express';
import { 
     createProduct,
     getAllProducts ,
     getProductById,
     updateProduct,
     deleteProduct,
     filterProducts
    } from '../controllers/productController';
import authenticateJWT from '../middleware/authMiddleware';

const router = express.Router();

// Route to create a product (authentication required)
router.post('/', authenticateJWT, createProduct);

// Route to get all products (authentication required)
router.get('/', authenticateJWT, getAllProducts);

// Route to get products by id (authentication required)
router.get('/:id', authenticateJWT, getProductById);

// Route to update product (authentication required)
router.put('/:id', authenticateJWT, updateProduct);

// Route to delete product (authentication required)
router.delete('/:id', authenticateJWT, deleteProduct);

// Route to get all products (authentication required)
router.post('/filter', authenticateJWT, filterProducts);

export default router;
