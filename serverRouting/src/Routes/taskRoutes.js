const express = require('express');
const { getTasks, getTask, postTask, putTask, deleteTasks, patchTask } = require('../Controllers/taskController');
const taskRouter = express.Router();

taskRouter.get('/', getTasks);
taskRouter.get('/:code', getTask);
taskRouter.post('/', postTask);
taskRouter.put('/', putTask);
taskRouter.delete('/', deleteTasks);
taskRouter.patch('/:id/:isComplete', patchTask);

module.exports = taskRouter;