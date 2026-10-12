"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markRead = exports.getNotifications = void 0;
const memoryNotifications = new Map();
const getNotifications = async (req, res) => {
    try {
        const userId = req.user?.userId || 'farmer-demo-1';
        let notifs = memoryNotifications.get(userId);
        if (!notifs) {
            notifs = [
                {
                    id: 'n-1',
                    title: 'Fertilizer Application Reminder',
                    message: 'Apply Urea fertilizer for Tomato crop in 3 days as per schedule.',
                    type: 'fertilizer',
                    read: false,
                    time: '2 hours ago'
                },
                {
                    id: 'n-2',
                    title: 'Irrigation Reminder',
                    message: 'Your crop needs irrigation in 2 days.',
                    type: 'irrigation',
                    read: false,
                    time: '5 hours ago'
                },
                {
                    id: 'n-3',
                    title: 'Market Price Update',
                    message: 'Tomato price increased by 12% in Nizamabad Market Yard.',
                    type: 'market',
                    read: true,
                    time: '1 day ago'
                },
                {
                    id: 'n-4',
                    title: 'Soil Report Reminder',
                    message: 'Upload new soil report for better seasonal recommendations.',
                    type: 'soil',
                    read: true,
                    time: '2 days ago'
                }
            ];
            memoryNotifications.set(userId, notifs);
        }
        return res.json({ success: true, notifications: notifs });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getNotifications = getNotifications;
const markRead = async (req, res) => {
    try {
        const userId = req.user?.userId || 'farmer-demo-1';
        const { id } = req.params;
        const notifs = memoryNotifications.get(userId) || [];
        const item = notifs.find((n) => n.id === id);
        if (item)
            item.read = true;
        return res.json({ success: true, message: 'Notification marked as read' });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.markRead = markRead;
