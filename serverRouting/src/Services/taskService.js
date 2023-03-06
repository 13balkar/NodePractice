const { Task } = require('../../database/models');
const HttpErrors = require('../../Errors/httpErrors');


const getTasks = async () => {
  const tasks = await Task.findAll();
  if (tasks.length === 0)
    throw new HttpErrors('Empty list of tasks.', 404);
  return tasks;
};

const postTask = async (task) => {
  const newTask = await Task.create({ ...task, isComplete: false });
  return newTask;
};

const deleteTasks = async (id) => {
  const status = await Task.destroy({ where: { id: id } });
  if (status === 0) {
    throw new HttpErrors('No task to delete', 404);
  } else {
    return status;
  }
};


const patchTask = async (taskId) => {
  const task = await Task.findOne({ where: { id: taskId } });
  const status = await Task.update({ isComplete: !task.isComplete }, { where: { id: parseInt(taskId) } });
  if (status[0] === 0) {
    throw new HttpErrors('Task not found', 404);
  } else {
    const updatedTask = await Task.findAll({ where: { id: taskId } });
    return updatedTask;
  }

};

module.exports = { getTasks, postTask, deleteTasks, patchTask };
