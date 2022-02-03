const Task = require('../models/Task')

module.exports = class TasksControllers {
  static showTasks(req, res) {
    res.render('tasks/showtasks')
  }

  static async createTaskSave(req, res) {
    const { title, description } = req.body

    const task = {
      title,
      description,
      done: false
    }

    await Task.create(task)

    res.redirect('/tasks')
  }

  static createTask(req, res) {
    res.render('tasks/createtask')
  }
}
