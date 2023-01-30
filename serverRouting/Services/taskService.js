const uuid = require('uuid');

let tasks = [];

const getTasks = () => {
  return tasks;
};

const getTask = (code) => {
  switch (code) {
  case 'complete': {
    return tasks.filter((task) => task.isComplete);
  }
  case 'incomplete': {
    return tasks.filter((task) => task.isComplete === false);
  }
  default: {
    const index = tasks.findIndex((task) => task.taskId === code);
    if (index === -1) {
      return null;
    } else {
      return tasks[index];
    }
  }
  }
};

const postTask = (task) => {
  const newTask = {
    taskId: uuid.v4(),
    isComplete: false,
    ...task,
  };
  tasks.push(newTask);
  return newTask;
};

const putTask = (taskUpdate) => {
  const index = tasks.findIndex((task) => task.taskId === taskUpdate.taskId);
  if (index === -1) {
    return null;
  }
  tasks[index] = { ...taskUpdate };
  return tasks[index];
};

const deleteTasks = () => {
  tasks = tasks.filter((task) => {
    if (!task.isComplete) {
      return task;
    }
  });
  return tasks;
};

const patchTask = (taskId, isComplete) => {
  const index = tasks.findIndex((task) => task.taskId == taskId);
  if (index === -1) {
    return null;
  }
  tasks[index].isComplete = isComplete;
  return tasks[index];
};

module.exports = { getTasks, getTask, postTask, putTask, deleteTasks, patchTask };
