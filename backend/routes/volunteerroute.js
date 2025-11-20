import express from 'express'

const router = express.Router()

import volunteerController from '../controllers/volunteercontroller.js'

router.get('/', volunteerController.getVolunteers)

router.post('/', volunteerController.createVolunteer)

router.delete('/:id', volunteerController.deleteVolunteer)

router.put('/:id', volunteerController.updateVolunteer)

export default router