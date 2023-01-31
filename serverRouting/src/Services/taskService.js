const { Task } = require('../../database/models');

const getTasks = () => {
  const tasks = Task.findAll();
  return tasks;
};

const getTask = async (code) => {
  switch (code) {
  case 'complete': {
    const tasks = await Task.findAll({ where: { isComplete: true } });
    return tasks;
  }
  case 'incomplete': {
    const tasks = await Task.findAll({ where: { isComplete: false } });
    return tasks;
  }
  default: {
    if (isNaN(code)) {
      return null;
    }
    const tasks = await Task.findAll({ where: { id: parseInt(code) } });
    if (tasks.length === 0) {
      return null;
    }
    return tasks;
  }
  }
};

const postTask = async (task) => {
  const newTask = await Task.create({ ...task, isComplete: false });
  return newTask;
};

const putTask = (taskUpdate) => {
  Task.update({ ...taskUpdate }, { where: { id: taskUpdate.id } });
  return Task.findAll({ where: { id: taskUpdate.id } });
};

const deleteTasks = async () => {
  await Task.destroy({ where: { isComplete: true } });
  return await Task.findAll();
};

const patchTask = (taskId, isComplete) => {
  Task.update({ isComplete: isComplete }, { where: { id: taskId } });
  return Task.findAll({ where: { id: taskId } });

};

module.exports = { getTasks, getTask, postTask, putTask, deleteTasks, patchTask };
