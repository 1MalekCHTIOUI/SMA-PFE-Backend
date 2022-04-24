const router = require("express").Router()
const notificationController = require("../Controllers/notifications")

router.get('/', notificationController.getNotifications)
router.get('/:userId', notificationController.getNotificationByUserId)
router.put('/:notifId', notificationController.unreadNotification)
router.post('/', notificationController.createNotification)

module.exports = router