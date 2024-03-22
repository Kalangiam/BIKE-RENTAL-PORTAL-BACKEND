import express from 'express'
import RRControllers from '../controllers/RentRequest.js'

const router = express.Router()

router.post('/create' ,RRControllers.create),
router.get('/:no',RRControllers.getByRrNo)

export default router