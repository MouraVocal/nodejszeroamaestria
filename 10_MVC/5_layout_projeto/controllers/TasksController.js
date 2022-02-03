const Task = require('../models/Task')

module.exports = class TasksControllers {
  static showTasks(req, res) {
    res.render('tasks/showtasks')
  }

  static createTask(req, res) {
    res.render('tasks/createtask')
  }
}
