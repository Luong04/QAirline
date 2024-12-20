const notificationService = require('../services/notificationServices');

const createNotification = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || authHeader !== "Bearer admin") {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    try {

        const { header, content } = req.body;
        await notificationService.createNotification(header, content);
        res.status(200).json({ message: "Tạo thông báo thành công." });
    } catch (error) {
        console.error("Error creating notification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getNotification = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || authHeader !== "Bearer admin") {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    try {

        const notifications = await notificationService.getNotification();
        if (!notifications) {
            return res.status(404).json({ error: "Notification not found" });
        }
        const formattedNotifications = notifications.map((notification) => notification.dataValues);
        console.log(formattedNotifications);
        res.status(200).json({ notifications: formattedNotifications});

    } catch (error) {
        console.error("Error fetching notification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const removeNotification = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || authHeader !== "Bearer admin") {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    try {

        const notification_id = req.body;
        console.log(notification_id.notification_id);
        if (!notification_id) {
            return res.status(400).json({ error: "Missing notification_id" });
        }
        const result = await notificationService.removeNotification(notification_id.notification_id);
        if (result === 0) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json({ message: "Xóa thông báo thành công." });
    } catch (error) {
        console.error("Error removing notification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const editNotification = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || authHeader !== "Bearer admin") {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    try {
        const {notification_id, header, content }= req.body;
        const notification = await notificationService.editNotification(notification_id, header, content);
        if (!notification) {
            return res.status(400).json({ error: "Can't update" });
        }
        res.status(200).json({ notification: notification});

    } catch (error) {
        console.error("Error fetching notification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    createNotification,
    getNotification,
    removeNotification,
    editNotification
};
