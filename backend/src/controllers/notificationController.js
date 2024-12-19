const notificationService = require('../services/notificationServices');

const createNotification = async (req, res) => {
    try {
        const content = req.body;
        await notificationService.createNotification(content);
        res.status(200).json({ message: "Tạo thông báo thành công." });
    } catch (error) {
        console.error("Error creating notification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getNotification = async (req, res) => {
    try {
        const notification_id = req.body.notification_id;
        if (!notification_id) {
            return res.status(400).json({ error: "Missing notification_id" });
        }
        const notification = await notificationService.getNotification(notification_id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json({ content: notification });
    } catch (error) {
        console.error("Error fetching notification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const removeNotification = async (req, res) => {
    try {
        const notification_id = req.body;
        if (!notification_id) {
            return res.status(400).json({ error: "Missing notification_id" });
        }
        const result = await notificationService.removeNotification(notification_id);
        if (result === 0) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json({ message: "Xóa thông báo thành công." });
    } catch (error) {
        console.error("Error removing notification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createNotification,
    getNotification,
    removeNotification
};
