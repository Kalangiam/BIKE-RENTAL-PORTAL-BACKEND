import express from 'express'
import AdminController from '../controllers/admin.js'
import validate from '../middleware/validate.js'
import RRControllers from '../controllers/RentRequest.js'
import AdminGuard from '../middleware/AdminGuard.js'

const router = express.Router()

router.get('/dashboard', validate, AdminGuard, AdminController.dashboard)
router.get('/list/:status', AdminController.list)
router.put('/change-status/:no', validate, AdminGuard, AdminController.changeStatus)
router.get('/service/:no', validate, AdminGuard, RRControllers.getByRrNo)

export default router