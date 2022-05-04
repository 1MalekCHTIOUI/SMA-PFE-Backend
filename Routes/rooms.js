const router = require("express").Router()
const roomController = require("../Controllers/rooms")

router.post('/', roomController.newRoom)
router.post('/newGroup', roomController.newGroupRoom)
router.put('/addNewGroupMember/:roomId', roomController.addNewGroupMember)
router.put('/removeGroupMember/:roomId/:memberId', roomController.removeGroupMember)
router.delete('/removeGroup/:roomId', roomController.removeGroup)
router.get('/:userId', roomController.getRoomByUserId)
router.get('/room/:roomId', roomController.getRoom)


module.exports = router