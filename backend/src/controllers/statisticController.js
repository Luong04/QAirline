const express = require('express');
const statisticServices = require('../services/statisticServices');

// API: Cập nhật thống kê
const updateStatistic = async (req, res) => {
    try {
        const { date, flag, ticket_id } = req.body;
        if (!date || typeof flag !== 'boolean' || !ticket_id) {
            return res.status(400).json({ message: 'Missing required fields: date, flag, or ticket_id' });
        }

        await statisticServices.updateStatistic(date, flag, ticket_id);
        return res.status(200).json({ message: 'Statistic updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// API: Lấy thống kê trong một ngày
const getStatisticInDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ message: 'Missing required field: date' });
        }

        const statistic = await statisticServices.getStatisticInDate(date);
        if (!statistic) {
            return res.status(404).json({ message: 'No statistic found for the given date' });
        }

        return res.status(200).json(statistic);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// API: Lấy thống kê trong một tuần
const getStatisticInWeek = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ message: 'Missing required field: date' });
        }

        const statistics = await statisticServices.getStatisticInWeek(date);
        return res.status(200).json(statistics);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// API: Lấy thống kê trong một tháng
const getStatisticInMonth = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ message: 'Missing required field: date' });
        }

        const statistics = await statisticServices.getStatisticInMonth(date);
        return res.status(200).json(statistics);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// API: Lấy tổng thống kê trong tuần
const getWeeklyTotals = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ message: 'Missing required field: date' });
        }

        const totals = await statisticServices.getWeeklyTotals(date);
        return res.status(200).json(totals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// API: Lấy tổng thống kê trong tháng
const getMonthlyTotals = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ message: 'Missing required field: date' });
        }

        const totals = await statisticServices.getMonthlyTotals(date);
        return res.status(200).json(totals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Định nghĩa route
module.exports = {
    updateStatistic,
    getStatisticInDate,
    getStatisticInWeek,
    getStatisticInMonth,
    getWeeklyTotals,
    getMonthlyTotals
};
