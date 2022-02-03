const { Router } = require('express')
const TasksControllers = require('../controllers/TasksController')

const router = Router()

router.get('/add', TasksControllers.createTask)
router.get('/', TasksControllers.showTasks)

module.exports = router
