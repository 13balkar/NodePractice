const { Task } = require('../../database/models');

const getTasks = () => {
  const tasks = Task.findAll();
  if (!tasks)
    throw new Error('No tasks found');
  return tasks;
};

const getTask = async (code) => {
  const tasks = await Task.findAll(code === 'complete' ? { where: { isComplete: true } } : code === 'incomplete' ? { where: { isComplete: false } } : { where: { id: parseInt(code) } });
  if (!tasks)
    throw new Error(`No tasks found for id  ${code}`);
  return tasks;
};

const postTask = async (task) => {
  const newTask = await Task.create({ ...task, isComplete: false });
  if (!newTask) {
    throw new Error('Error creating task');
  }
  return newTask;
};

const putTask = (taskUpdate) => {
  Task.update({ ...taskUpdate }, { where: { id: taskUpdate.id } });
  const updatedTask = Task.findAll({ where: { id: taskUpdate.id } });
  if (!updatedTask) {
    throw new Error('Error updating task');
  }
  return updatedTask;
};

const deleteTasks = async () => {
  await Task.destroy({ where: { isComplete: true } });
  return getTasks();
};

const patchTask = (taskId, isComplete) => {
  Task.update({ isComplete: isComplete }, { where: { id: taskId } });
  const updatedTask = Task.findAll({ where: { id: taskId } });
  if (!updatedTask) {
    throw new Error('Error updating task');
  }
  return updatedTask;

};

module.exports = { getTasks, getTask, postTask, putTask, deleteTasks, patchTask };
