const Notification = require("../Models/Notification");

exports.createNotification = async (req, res, next) => {
  const newNotification = new Notification(req.body);
  try {
    const savedNotif = await newNotification.save();
    res.status(200).json(savedNotif);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const notifs = await Notification.find();
    res.status(200).json(notifs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNotications = async (req, res, next) => {
  try {
    await Notification.deleteMany({ userId: req.params.userId });
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getNotificationByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const notifs = await Notification.find({ userId: userId });
    res.status(200).json(notifs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.readNotification = async (req, res, next) => {
  const { notifId } = req.params;
  try {
    const notifs = await Notification.findByIdAndUpdate(notifId, {
      read: true,
    });
    res.status(200).json(notifs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.readAllNotifications = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const notifs = await Notification.updateMany(
      { userId: userId },
      {
        $set: { read: true },
      },
    );
    res.status(200).json(notifs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
