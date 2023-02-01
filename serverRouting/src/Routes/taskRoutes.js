const express = require('express');
const { getTasks, postTask, putTask, deleteTasks, patchTask } = require('../Controllers/taskController');
const taskRouter = express.Router();

taskRouter.get('/', getTasks);
taskRouter.get('/:code', getTasks);
taskRouter.post('/', postTask);
taskRouter.put('/', putTask);
taskRouter.delete('/', deleteTasks);
taskRouter.patch('/:id/:isComplete', patchTask);

module.exports = taskRouter;