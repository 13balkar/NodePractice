const express = require('express');
const { getTasks, getTask, postTask, putTask, deleteTasks, patchTask } = require('../Controllers/taskController');
const taskRouter = express.Router();
const { getTaskValidator, postTaskValidator, putTaskValidator, patchTaskValidator, tokenValidator } = require('../Middlewares/task.validator');
taskRouter.get('/', tokenValidator, getTasks);
taskRouter.get('/:code', tokenValidator, getTaskValidator, getTask);
taskRouter.post('/', tokenValidator, postTaskValidator, postTask);
taskRouter.put('/', tokenValidator, putTaskValidator, putTask);
taskRouter.delete('/', tokenValidator, deleteTasks);
taskRouter.patch('/:id/:isComplete', tokenValidator, patchTaskValidator, patchTask);

module.exports = taskRouter;