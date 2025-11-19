import express from 'express'

const router = express.Router()

import taskController from '../controllers/taskController.js'

router.get('/', taskController.getTasks)

router.post('/', taskController.createTask)

router.delete('/:id', taskController.deleteTask)

// router.put('/:id', todoController.updateTodo)

export default router