import express from 'express'
import { getAllExpense, createExpense, deleteExpense, updateExpense } from '../controllers/expenseController.js'
const router = express.Router()


router.get('/',getAllExpense)
router.post('/',createExpense)
router.put('/:id',updateExpense)
router.delete('/:id',deleteExpense)

export default router