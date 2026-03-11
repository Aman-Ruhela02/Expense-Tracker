import express from 'express'
import { getAllExpense, createExpense, deleteExpense, updateExpense } from '../controllers/expenseController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getAllExpense).post(protect, createExpense)
router.route('/:id').put(protect, updateExpense).delete(protect, deleteExpense)

export default router