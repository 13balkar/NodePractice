const taskService = require('../../src/Services/taskService');
const db = require('../../database/models');
describe('Service Testing', () => {
  describe('getTasks', () => {
    it('should return all tasks', async () => {
      const mockRes = [{ 'taskName': 'test', 'id': 1, 'completed': false }];
      jest.spyOn(db.Task, 'findAll').mockResolvedValue(mockRes);
      const tasks = await taskService.getTasks();
      expect(tasks).toEqual(mockRes);
    });
    it('should return all tasks', async () => {
      const mockRes = [{ 'taskName': 'test', 'id': 1, 'completed': false }, { 'taskName': 'test2', 'id': 2, 'completed': false }];
      jest.spyOn(db.Task, 'findAll').mockResolvedValue(mockRes);
      const tasks = await taskService.getTasks();
      expect(tasks).toEqual(mockRes);
    });
    it('should throw error if no tasks', async () => {
      const mockRes = [];
      jest.spyOn(db.Task, 'findAll').mockResolvedValue(mockRes);
      await expect(taskService.getTasks()).rejects.toThrowError({
        message: 'Empty list of tasks.',
        status: 404
      });
    });
  });
  describe('getTask', () => {
    it('should return task by id', async () => {
      const mockRes = [{ 'taskName': 'test', 'id': 1, 'completed': false }];
      jest.spyOn(db.Task, 'findAll').mockResolvedValue(mockRes);
      const tasks = await taskService.getTask(1);
      expect(tasks).toEqual(mockRes);
    });
    it('should return task by id', async () => {
      const mockRes = [{ 'taskName': 'test2', 'id': 2, 'completed': false }];
      jest.spyOn(db.Task, 'findAll').mockResolvedValue(mockRes);
      const tasks = await taskService.getTask(2);
      expect(tasks).toEqual(mockRes);
    });
    it('should return task by complete', async () => {
      const mockRes = [{ 'taskName': 'test', 'id': 1, 'completed': true }];
      jest.spyOn(db.Task, 'findAll').mockResolvedValue(mockRes);
      const tasks = await taskService.getTask('complete');
      expect(tasks).toEqual(mockRes);
    });
    it('should return task by incomplete', async () => {
      const mockRes = [{ 'taskName': 'test', 'id': 1, 'completed': false }];
      jest.spyOn(db.Task, 'findAll').mockResolvedValue(mockRes);
      const tasks = await taskService.getTask('incomplete');
      expect(tasks).toEqual(mockRes);
    });
    it('should throw error if no tasks', async () => {
      const mockRes = [];
      jest.spyOn(db.Task, 'findAll').mockResolvedValue(mockRes);
      await expect(taskService.getTask(1)).rejects.toThrowError({
        message: 'Task not found.',
        status: 404
      });
    });
  });
  describe('postTask', () => {
    it('should create new task and return', async () => {
      const mockReq = { 'taskName': 'test' };
      const mockRes = { 'taskName': 'test', 'id': 1, 'completed': false };
      jest.spyOn(db.Task, 'create').mockResolvedValue(mockRes);
      const createdTask = await taskService.postTask(mockReq);
      expect(createdTask).toEqual(mockRes);
    });
  });
  describe('putTask', () => {
    it('should update task and return', async () => {
      const mockReq = { 'taskName': 'test', 'id': 1, 'completed': true };
      const mockRes = { 'taskName': 'test', 'id': 1, 'completed': true };
      jest.spyOn(db.Task, 'update').mockResolvedValue([1]);
      jest.spyOn(db.Task, 'findAll').mockResolvedValue(mockRes);
      const updatedTask = await taskService.putTask(mockReq);
      expect(updatedTask).toEqual(mockRes);
    });
    it('should throw error if task not found', async () => {
      const mockReq = { 'taskName': 'test', 'id': 1, 'completed': true };
      jest.spyOn(db.Task, 'update').mockResolvedValue([0]);
      await expect(taskService.putTask(mockReq)).rejects.toThrowError({
        message: 'Task not found.',
        status: 404
      });
    });
  });
  describe('deleteTasks', () => {
    it('should delete tasks and return', async () => {
      const mockRes = 1;
      jest.spyOn(db.Task, 'destroy').mockResolvedValue(mockRes);
      const deletedTasks = await taskService.deleteTasks();
      expect(deletedTasks).toEqual(mockRes);
    });
    it('should throw error if no tasks to delete', async () => {
      const mockRes = 0;
      jest.spyOn(db.Task, 'destroy').mockResolvedValue(mockRes);
      await expect(taskService.deleteTasks()).rejects.toThrowError({
        message: 'No task to delete',
        status: 404
      });
    });
  });
  describe('patchTask', () => {
    it('should update task and return', async () => {
      const mockReq = { 'taskName': 'test', 'id': 1, 'completed': true };
      const mockRes = { 'taskName': 'test', 'id': 1, 'completed': true };
      jest.spyOn(db.Task, 'update').mockResolvedValue([1]);
      jest.spyOn(db.Task, 'findAll').mockResolvedValue(mockRes);
      const updatedTask = await taskService.patchTask(mockReq);
      expect(updatedTask).toEqual(mockRes);
    });
    it('should throw error if task not found', async () => {
      const mockReq = { 'taskName': 'test', 'id': 1, 'completed': true };
      jest.spyOn(db.Task, 'update').mockResolvedValue([0]);
      await expect(taskService.patchTask(mockReq)).rejects.toThrowError({
        message: 'Task not found',
        status: 404
      });
    });
  });
});