const { Router } = require('express')
const TasksControllers = require('../controllers/TasksController')

const router = Router()

router.get('/edit/:id', TasksControllers.editTask)
router.get('/add', TasksControllers.createTask)
router.post('/add', TasksControllers.createTaskSave)
router.post('/delete', TasksControllers.deleteTask)
router.get('/', TasksControllers.showTasks)

module.exports = router
