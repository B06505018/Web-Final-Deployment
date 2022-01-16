import express from 'express';
import expenseApi from '../api/expense';

const router = express.Router();

router.route('/api/expenses/current/preview').get(expenseApi.currentMonthPreview)

router.route('/api/expenses/by/category').get(expenseApi.expenseByCategory)

router.route('/api/expenses/plot').get(expenseApi.plotExpenses)

router.route('/api/expenses/category/averages').get(expenseApi.averageCategories)

router.route('/api/expenses/yearly').get(expenseApi.yearlyExpenses)

router.route('/api/expenses')
    .post(expenseApi.create)
    .get(expenseApi.listByUser)

router.route('/api/expenses/:expenseId')
    .put(expenseApi.update)
    .delete(expenseApi.remove)

router.param('expenseId', expenseApi.findExpenseById)

export default router