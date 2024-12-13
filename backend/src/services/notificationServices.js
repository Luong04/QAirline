const Notification = require('../entity/notifications');

const createNotification = async (content) => {
    const date = new Date();
    return await Notification.create({ date, content });
};

const getNotification = async (notification_id) => {
    return await Notification.findByPk(notification_id);
};

const removeNotification = async (notification_id) => {
    return await Notification.destroy({
        where: { notification_id }
    });
};

module.exports = {
    createNotification,
    getNotification,
    removeNotification
};
