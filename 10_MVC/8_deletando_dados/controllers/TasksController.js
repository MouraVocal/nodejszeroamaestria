const Task = require('../models/Task')

module.exports = class TasksControllers {

  static async deleteTask(req, res) {
    const { id } = req.body
    await Task.destroy({ where: { id: id }})
    res.redirect('/tasks')
  }

  static async showTasks(req, res) {
    const tasks = await Task.findAll({ raw: true })

    res.render('tasks/showtasks', { tasks })
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
