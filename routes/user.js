import express from "express"
import UserController from '../controllers/users.js'
import validate from "../middleware/validate.js"
import AdminGuard from "../middleware/AdminGuard.js"

const router = express.Router()

router.post('/create', UserController.create)
router.get('/', validate, AdminGuard, UserController.getAllUsers)
router.post('/login', UserController.login)
router.post('/forgot-password',UserController.forgotPassword )
router.post('/reset-password',UserController.resetPassword)


export default router