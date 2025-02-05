const Notification = require('../entity/notifications');

const createNotification = async (header , content) => {
    const date = new Date();
    return await Notification.create({ header, date, content });
};

const getNotification = async () => {
    return await Notification.findAll();
};

const removeNotification = async (notification_id) => {
    return await Notification.destroy({
        where: { notification_id }
    });
};

const editNotification = async (notification_id, header, content) => {
    try {
        // Cập nhật thông báo dựa trên notification_id
        const [updatedRows] = await Notification.update(
            { header, content },  // Các trường cần cập nhật
            { where: { notification_id } }  // Điều kiện tìm bản ghi cần cập nhật
        );
        
        if (updatedRows === 0) {
            return { message: 'Notification not found' };
        }

        return { message: 'Notification updated successfully' };
    } catch (error) {
        console.error("Error updating notification:", error);
        throw new Error("Error updating notification");
    }
};


module.exports = {
    createNotification,
    getNotification,
    removeNotification,
    editNotification
};
