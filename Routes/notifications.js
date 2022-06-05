const router = require("express").Router();
const notificationController = require("../Controllers/notifications");

router.get("/", notificationController.getNotifications);
router.get("/:userId", notificationController.getNotificationByUserId);
router.delete("/:userId", notificationController.deleteNotications);
router.put("/:notifId", notificationController.readNotification);
router.put("/all/:userId", notificationController.readAllNotifications);
router.post("/", notificationController.createNotification);

module.exports = router;
