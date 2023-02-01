const { Task } = require('../../database/models');
const HttpErrors = require('../../Errors/httpErrors');


const getTasks = async () => {
  const tasks = await Task.findAll();
  if (tasks.length === 0)
    throw new HttpErrors('Empty list of tasks.', 404);
  return tasks;
};

const getTask = async (code) => {
  const tasks = await Task.findAll(code === 'complete' ? { where: { isComplete: true } } : code === 'incomplete' ? { where: { isComplete: false } } : { where: { id: parseInt(code) } });
  if (tasks.length === 0)
    throw new HttpErrors('Task not found.', 404);
  return tasks;
};

const postTask = async (task) => {
  const newTask = await Task.create({ ...task, isComplete: false });
  return newTask;
};

const putTask = async (taskUpdate) => {
  const status = await Task.update({ ...taskUpdate }, { where: { id: taskUpdate.id } });
  if (status[0] === 0) {
    throw new HttpErrors('Task not found.', 404);
  } else {
    const updatedTask = await Task.findAll({ where: { id: taskUpdate.id } });
    return updatedTask;
  }
};

const deleteTasks = async () => {
  const status = await Task.destroy({ where: { isComplete: true } });
  if (status === 0) {
    throw new HttpErrors('No task to delete', 404);
  } else {
    return status;
  }
};


const patchTask = async (taskId, isComplete) => {
  const status = await Task.update({ isComplete: isComplete }, { where: { id: parseInt(taskId) } });
  if (status[0] === 0) {
    throw new HttpErrors('Task not found', 404);
  } else {
    const updatedTask = await Task.findAll({ where: { id: taskId } });
    return updatedTask;
  }

};

module.exports = { getTasks, getTask, postTask, putTask, deleteTasks, patchTask };
