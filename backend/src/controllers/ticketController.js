
const { getTicketById, createTicket} = require('../services/ticketServices');
const Ticket = require('../entity/tickets');

// GET: Lấy thông tin ticket dựa vào form
const getTicket = async (req, res) => {
    const {ticketCode} = req.body;
    console.log(ticketCode);
    try {
        const ticketInfo = await getTicketById(ticketCode);

        if (typeof ticketInfo === 'string') {
            return res.status(400).json({ message: ticketInfo }); // Lỗi từ dịch vụ
        }
        console.log(ticketInfo);
        res.status(200).json(ticketInfo);
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
    const ticketIds = req.body;
    console.log("danh sach ve ",ticketIds);
    try {
        for(const ticket of ticketIds) {
            const result = await Ticket.destroy({
                where : {
                    ticket_id: ticket
                }
            });
        }
        res.status(200).json({
            message: 'Ticket canceled successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = {
    getTicket,
    createNewTicket,
    cancelTicketById
};
