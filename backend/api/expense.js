import Expense from '../models/Expense.js';
import mongoose from 'mongoose';
import extend from 'lodash/extend.js';

const create = async (req, res) => {
    try {
        // console.log(req.body.expense);
        const expense = new Expense(req.body.expense);
        await expense.save();
        return res.status(200).json({
            'message': 'Expense created successfully.'
        });
    } catch (err) {
        return res.status(400).json({
            'error': 'Expense created unsuccessfully.'
        });
    }
}

const findExpenseById = async (req, res, next, id) => {
    try {
        let expense = await Expense.findById(id).exec();
        if (!expense) {
            return res.status('400').json({
                error: "Expense record not found"
            });
        }

        req.expense = expense;
        next();
    } catch (err) {
        return res.status(400).json({
            'error': 'find error.'
        });
    }
}

const listByUser = async (req, res) => {
    // console.log(req.query);
    let firstDay = req.query.firstDay
    let lastDay = req.query.lastDay
    try {
        let expenses = await Expense.find({ '$and': [{ 'incurred_on': { '$gte': firstDay, '$lte': lastDay } }] }).sort('incurred_on');
        res.json(expenses)
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            'error': 'list error.'
        })
    }
}

const currentMonthPreview = async (req, res) => {
    const date = new Date(), y = date.getFullYear(), m = date.getMonth()
    const firstDay = new Date(y, m, 1)
    const lastDay = new Date(y, m + 1, 0)

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const tomorrow = new Date()
    tomorrow.setUTCHours(0, 0, 0, 0)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const yesterday = new Date()
    yesterday.setUTCHours(0, 0, 0, 0)
    yesterday.setDate(yesterday.getDate() - 1)

    try {
        let currentPreview = await Expense.aggregate([
            {
                $facet: {
                    month: [
                        { $match: { incurred_on: { $gte: firstDay, $lt: lastDay } } },
                        { $group: { _id: "currentMonth", totalSpent: { $sum: "$amount" } } },
                    ],
                    today: [
                        { $match: { incurred_on: { $gte: today, $lt: tomorrow } } },
                        { $group: { _id: "today", totalSpent: { $sum: "$amount" } } },
                    ],
                    yesterday: [
                        { $match: { incurred_on: { $gte: yesterday, $lt: today } } },
                        { $group: { _id: "yesterday", totalSpent: { $sum: "$amount" } } },
                    ]
                }
            }])
        let expensePreview = { month: currentPreview[0].month[0], today: currentPreview[0].today[0], yesterday: currentPreview[0].yesterday[0] }
        res.json(expensePreview)
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            'error': 'Current Month Preview error.'
        })
    }
}

const expenseByCategory = async (req, res) => {
    const date = new Date(), y = date.getFullYear(), m = date.getMonth()
    const firstDay = new Date(y, m, 1)
    const lastDay = new Date(y, m + 1, 0)

    try {
        let categoryMonthlyAvg = await Expense.aggregate([
            {
                $facet: {
                    average: [
                        { $group: { _id: { category: "$category", month: { $month: "$incurred_on" } }, totalSpent: { $sum: "$amount" } } },
                        { $group: { _id: "$_id.category", avgSpent: { $avg: "$totalSpent" } } },
                        {
                            $project: {
                                _id: "$_id", value: { average: "$avgSpent" },
                            }
                        }
                    ],
                    total: [
                        { $match: { incurred_on: { $gte: firstDay, $lte: lastDay } } },
                        { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } },
                        {
                            $project: {
                                _id: "$_id", value: { total: "$totalSpent" },
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    overview: { $setUnion: ['$average', '$total'] },
                }
            },
            { $unwind: '$overview' },
            { $replaceRoot: { newRoot: "$overview" } },
            { $group: { _id: "$_id", mergedValues: { $mergeObjects: "$value" } } }
        ]).exec()
        res.json(categoryMonthlyAvg)
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            'error': 'Expense By Category Error.'
        })
    }
}

const averageCategories = async (req, res) => {
    // console.log(req.query)
    const firstDay = new Date(req.query.firstDay)
    const lastDay = new Date(req.query.lastDay)

    try {
        let categoryMonthlyAvg = await Expense.aggregate([
            { $match: { incurred_on: { $gte: firstDay, $lte: lastDay } } },
            { $group: { _id: { category: "$category" }, totalSpent: { $sum: "$amount" } } },
            { $group: { _id: "$_id.category", avgSpent: { $avg: "$totalSpent" } } },
            { $project: { x: '$_id', y: '$avgSpent' } }
        ]).exec()
        res.json({ monthAVG: categoryMonthlyAvg })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            'error': 'Average Categories Error.'
        })
    }
}

const yearlyExpenses = async (req, res) => {
    // console.log(req.query.year)
    const y = req.query.year
    const firstDay = new Date(y, 0, 1)
    const lastDay = new Date(y, 12, 0)
    try {
        let totalMonthly = await Expense.aggregate([
            { $match: { incurred_on: { $gte: firstDay, $lt: lastDay } } },
            { $group: { _id: { $month: "$incurred_on" }, totalSpent: { $sum: "$amount" } } },
            { $project: { x: '$_id', y: '$totalSpent' } }
        ]).exec()
        res.json({ monthTot: totalMonthly })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            'error': 'Yearly Expenses Error.'
        })
    }
}

const plotExpenses = async (req, res) => {
    // console.log(req.query.month)
    const date = new Date(req.query.month), y = date.getFullYear(), m = date.getMonth()
    const firstDay = new Date(y, m, 1)
    const lastDay = new Date(y, m + 1, 0)

    try {
        let totalMonthly = await Expense.aggregate([
            { $match: { incurred_on: { $gte: firstDay, $lt: lastDay } } },
            { $project: { x: { $dayOfMonth: '$incurred_on' }, y: '$amount' } }
        ]).exec()
        res.json(totalMonthly)
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            'error': 'Plot Expenses Error.'
        })
    }
}

const update = async (req, res) => {
    try {
        // console.log(req.expense)
        let expense = req.expense
        expense = extend(expense, req.body.expense)
        expense.updated = Date.now()
        await expense.save()
        res.json(expense)
    } catch (err) {
        return res.status(400).json({
            'error': 'Update Error.'
        })
    }
}

const remove = async (req, res) => {
    try {
        let expense = req.expense
        let deletedExpense = await expense.remove()
        res.json(deletedExpense)
    } catch (err) {
        return res.status(400).json({
            'error': 'Remove Error.'
        })
    }
}

export default {
    create,
    findExpenseById,
    currentMonthPreview,
    expenseByCategory,
    averageCategories,
    yearlyExpenses,
    plotExpenses,
    listByUser,
    remove,
    update,
}