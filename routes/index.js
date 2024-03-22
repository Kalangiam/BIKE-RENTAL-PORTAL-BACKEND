import express from 'express'
import UserRoutes from './user.js'
import IndexController from '../controllers/index.js'
import AdminRoutes from './admin.js'
import RRoutes from './RentRequest.js'



const router = express.Router()

router.get('/', IndexController.home)
router.use('/users', UserRoutes)
router.use('/admin', AdminRoutes)
router.use('/rr',RRoutes)
export default router