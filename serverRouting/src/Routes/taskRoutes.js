const express = require('express');
const { getTasks, postTask, deleteTasks, patchTask } = require('../Controllers/taskController');
const taskRouter = express.Router();
const { postTaskValidator, patchTaskValidator } = require('../Middlewares/task.validator');

taskRouter.post('/', postTaskValidator, postTask);
taskRouter.get('/', getTasks);
taskRouter.delete('/:id', deleteTasks);
taskRouter.patch('/:id', patchTaskValidator, patchTask);

module.exports = taskRouter;