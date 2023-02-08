const express = require('express');
const { getTasks, getTask, postTask, putTask, deleteTasks, patchTask } = require('../Controllers/taskController');
const taskRouter = express.Router();
const { getTaskValidator, postTaskValidator, putTaskValidator, patchTaskValidator } = require('../Middlewares/task.validator');
taskRouter.get('/', getTasks);
taskRouter.get('/:code', getTaskValidator, getTask);
taskRouter.post('/', postTaskValidator, postTask);
taskRouter.put('/', putTaskValidator, putTask);
taskRouter.delete('/', deleteTasks);
taskRouter.patch('/:id/:isComplete', patchTaskValidator, patchTask);

module.exports = taskRouter;