const express = require('express');
const { getTicketbyForm, createTicket, cancelTicket } = require('../services/ticketServices');

// GET: Lấy thông tin ticket dựa vào form
const getTicket = async (req, res) => {
    const { ticket_id, customer_id } = req.body;

    try {
        const ticket = await getTicketbyForm(ticket_id, customer_id);

        if (typeof ticket === 'string') {
            return res.status(400).json({ message: ticket }); // Lỗi từ dịch vụ
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// POST: Tạo ticket mới
const createNewTicket = async (req, res) => {
    const ticketData = req.body;

    try {
        const newTicket = await createTicket(ticketData);
        res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// DELETE: Hủy ticket
const cancelTicketById = async (req, res) => {
    const { ticket_id } = req.params;

    try {
        const result = await cancelTicket(ticket_id);

        if (typeof result === 'string') {
            return res.status(400).json({ message: result }); // Lỗi từ dịch vụ
        }

        res.status(200).json({
            message: 'Ticket canceled successfully',
            refundRate: result,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = {
    getTicket,
    createNewTicket,
    cancelTicketById,
};
