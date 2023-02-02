const taskController = require('../../src/Controllers/taskController');
const taskService = require('../../src/Services/taskService');
// const HttpErrors = require('../../Errors/httpErrors');
describe('Test  cases for ToDO App', () => {
  describe('Test  cases for post request', () => {
    it('should send the created task', async () => {
      jest.spyOn(taskService, 'postTask').mockResolvedValue([{ id: 1, taskName: 'test', isComplete: false }]);
      const mockReq = { body: { taskName: 'test' } };
      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };
      await taskController.postTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.status().json).toBeCalledWith([{ id: 1, taskName: 'test', isComplete: false }]);
    });
    it('should throw an internal server error if there is some bug at server side', async () => {
      jest.spyOn(taskService, 'postTask').mockRejectedValue(new Error('Internal server error'));
      const mockReq = { body: { taskName: 'test' } };
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };
      await taskController.postTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.status().send).toBeCalledWith({ message: 'Internal server error.' });
    });
  });
  describe('Test  cases for put request', () => {
    it('should send the updated task', async () => {
      jest.spyOn(taskService, 'putTask').mockResolvedValue([{ id: 1, taskName: 'test', isComplete: true }]);
      const mockReq = { body: { taskName: 'test', id: 1, isComplete: true } };
      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };
      await taskController.putTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().json).toBeCalledWith([{ id: 1, taskName: 'test', isComplete: true }]);
    });
    // it('should throw an error if task is not found', async () => {
    //   jest.spyOn(taskService, 'updateTask').mockImplementation(() => { throw new HttpErrors('Task not found', 404); });
    //   const mockReq = { body: { taskName: 'test', id: 2, isComplete: true } };
    //   const mockRes = {
    //     status: jest.fn().mockReturnValue({ send: jest.fn() })
    //   };
    //   await taskController.putTask(mockReq, mockRes);
    //   expect(mockRes.status).toBeCalledWith(404);
    //   expect(mockRes.status().send).toBeCalledWith({ message: 'Task not found' });
    // });
    it('should throw an internal server error if there is some bug at server side', async () => {
      const mockReq = { body: { taskName: 'test', id: 1, isComplete: true } };
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };
      jest.spyOn(taskService, 'putTask').mockRejectedValue(new Error('Internal server error'));
      await taskController.putTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.status().send).toBeCalledWith({ message: 'Internal server error.' });
    });
  });
  describe('Test cases for deleteTask', () => {
    it('should delete the task', async () => {
      jest.spyOn(taskService, 'deleteTasks').mockResolvedValue(2);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };
      await taskController.deleteTasks(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().send).toBeCalledWith({ message: '2 tasks deleted' });
    });
    it('should throw an internal server error if there is some bug at server side', async () => {
      jest.spyOn(taskService, 'deleteTasks').mockRejectedValue(new Error('Internal server error.'));
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };
      await taskController.deleteTasks(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.status().send).toBeCalledWith({ message: 'Internal server error.' });
    });
    // it('should throw an Http error when there is no task to be deleted', async () => {
    //   jest.spyOn(taskService, 'deleteTasks').mockResolvedValue({ message: 'No task to be deleted' });
    //   const mockReq = {};
    //   const mockRes = {
    //     status: jest.fn().mockReturnValue({ send: jest.fn() })
    //   };
    //   await taskController.deleteTasks(mockReq, mockRes);
    //   expect(mockRes.status).toBeCalledWith(404);
    //   expect(mockRes.status().send).toBeCalledWith({ message: 'No task to be deleted' });

    // });
  });
  describe('Test Cases for patchTask', () => {
    it('should update the task', async () => {
      jest.spyOn(taskService, 'patchTask').mockResolvedValue({ id: 1, taskName: 'test', isComplete: true });
      const mockReq = { params: { id: 1, isComplete: true } };
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };
      await taskController.patchTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().send).toBeCalledWith({ id: 1, taskName: 'test', isComplete: true });
    });
    // it('should throw an error if task is not found', async () => { });
    it('should throw an internal server error if there is some bug at server side', async () => {
      jest.spyOn(taskService, 'patchTask').mockRejectedValue(new Error('Internal server error.'));
      const mockReq = { params: { id: 1, isComplete: true } };
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };
      await taskController.patchTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.status().send).toBeCalledWith({ message: 'Internal server error.' });
    });
  });
  describe('Test Cases for getTask with code', () => {
    it('should return all the tasks with isComplete as true', async () => {
      jest.spyOn(taskService, 'getTasks').mockResolvedValue([{ id: 1, taskName: 'test', isComplete: true }]);
      const mockReq = { query: { isComplete: true } };
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };
      await taskController.getTasks(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().send).toBeCalledWith([{ id: 1, taskName: 'test', isComplete: true }]);
    });
    it('should return all the tasks with isComplete as false', async function () {
      jest.spyOn(taskService, 'getTasks').mockResolvedValue([{ id: 1, taskName: 'test', isComplete: false }]);
      const mockReq = { query: { isComplete: false } };
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };
      await taskController.getTasks(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().send).toBeCalledWith([{ id: 1, taskName: 'test', isComplete: false }]);
    });
    it('should return a task with given id', async () => {
      jest.spyOn(taskService, 'getTasks').mockResolvedValue([{ id: 1, taskName: 'test', isComplete: false }]);
      const mockReq = { params: { id: 1 } };
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };
      await taskController.getTasks(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().send).toBeCalledWith([{ id: 1, taskName: 'test', isComplete: false }]);
    });
    // it('should throw an internal server error if there is some bug at server side', async () => {
    //   jest.spyOn(taskService, 'getTask').mockRejectedValue(new Error('Internal server error.'));
    //   const mockReq = { params: { id: 12 } };
    //   const mockRes = {
    //     status: jest.fn().mockReturnValue({ send: jest.fn() })
    //   };
    //   await taskController.getTask(mockReq, mockRes);
    //   expect(mockRes.status).toBeCalledWith(500);
    //   expect(mockRes.status().send).toBeCalledWith({ message: 'Internal server error.' });
    // });

  });
  describe('Test Cases for getTasks', () => {
    it('Should return all the tasks', async () => {
      jest.spyOn(taskService, 'getTasks').mockResolvedValue([{ id: 1, title: 'test', isComplete: true }]);
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };
      await taskController.getTasks(null, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status().send).toBeCalledWith([{ id: 1, title: 'test', isComplete: true }]);
    });
    it('should throw an internal server error if there is some bug at server side', async () => {
      jest.spyOn(taskService, 'getTasks').mockRejectedValue(new Error('Internal server error.'));
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };
      await taskController.getTasks(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.status().send).toBeCalledWith({ message: 'Internal server error.' });
    });
  });
});