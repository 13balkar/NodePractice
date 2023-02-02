const taskValidator = require('../../src/middlewares/task.validator.js');

describe('Task Validator', () => {
  describe('getTaskValidator', () => {
    it('should throw an Http error with error code when id is not a number ', () => {
      const mockReq = { params: { code: 'abcd' } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.getTaskValidator(mockReq, mockRes);
      taskValidator.getTaskValidator(mockReq, mockRes, () => { });
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"value" with value "abcd" fails to match the required pattern: /^[0-9]+$/' });
    });
    it('should throw an Http error with error code when id is not provided ', () => {
      const mockReq = { params: {} };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.getTaskValidator(mockReq, mockRes);
      taskValidator.getTaskValidator(mockReq, mockRes, () => { });
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"value" is required' });
    });
  });
  describe('postTaskValidator', () => {
    it('should throw an Http error with error code when length of taskName is less than 3 ', () => {
      const mockReq = { body: { taskName: 'ab' } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.postTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"taskName" length must be at least 3 characters long' });
    });
    it('should throw an Http error with error code when length of taskName is greater than 30 ', () => {
      const mockReq = { body: { taskName: 'abcdefghijklmnopqrstuvwxyz123456789' } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.postTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"taskName" length must be less than or equal to 30 characters long' });
    });
    it('should throw an Http error with error code when taskName is not a string ', () => {
      const mockReq = { body: { taskName: 123 } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.postTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"taskName" must be a string' });
    });
    it('should throw an Http error with error code when taskName is not provided ', () => {
      const mockReq = { body: {} };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.postTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ message: '"taskName" is required' });
    });
  });
  describe('putTaskValidator', () => {
    it('should throw an Http error with error code when length of taskName is less than 3 ', () => {
      const mockReq = { body: { taskName: 'ab', isComplete: true, id: 1 } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.putTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"taskName" length must be at least 3 characters long' });
    });
    it('should throw an Http error with error code when length of taskName is greater than 30 ', () => {
      const mockReq = { body: { taskName: 'abcdefghijklmnopqrstuvwxyz123456789', isComplete: true, id: 1 } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.putTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"taskName" length must be less than or equal to 30 characters long' });
    });
    it('should throw an Http error with error code when taskName is not a string ', () => {
      const mockReq = { body: { taskName: 123, isComplete: true, id: 1 } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.putTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"taskName" must be a string' });
    });
    it('should throw an Http error with error code when taskName is not provided ', () => {
      const mockReq = { body: { isComplete: true, id: 1 } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.putTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"taskName" is required' });
    });
    it('should throw an Http error with error code when isComplete is not a boolean ', () => {
      const mockReq = { body: { taskName: 'abc', isComplete: 12, id: 1 } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.putTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"isComplete" must be a boolean' });
    });
    it('should throw an Http error with error code when isComplete is not provided ', () => {
      const mockReq = { body: { taskName: 'abc', id: 1 } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.putTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"isComplete" is required' });
    });
    it('should throw an Http error with error code when id is not a number ', () => {
      const mockReq = { body: { taskName: 'abc', isComplete: true, id: 'ab' } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.putTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"id" must be a number' });
    });
    it('should throw an Http error with error code when id is not provided ', () => {
      const mockReq = { body: { taskName: 'abc', isComplete: true } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.putTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"id" is required' });
    });
    it('should throw an Http error with error code when id is not a positive number ', () => {
      const mockReq = { body: { taskName: 'abc', isComplete: true, id: -1 } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.putTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"id" must be a positive number' });
    });
  });
  describe('patchTaskValidator', () => {
    it('should throw an Http error with error code when isComplete is not a boolean ', () => {
      const mockReq = { params: { isComplete: 12, id: 1 } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.patchTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"isComplete" must be a boolean' });
    });
    it('should throw an Http error with error code when isComplete is not provided ', () => {
      const mockReq = { params: { id: 1 } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.patchTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"isComplete" is required' });
    });
    it('should throw an Http error with error code when id is not a number ', () => {
      const mockReq = { params: { isComplete: true, id: 'ab' } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.patchTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"id" must be a number' });
    });
    it('should throw an Http error with error code when id is not provided ', () => {
      const mockReq = { params: { isComplete: true } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.patchTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"id" is required' });
    });
    it('should throw an Http error with error code when id is not a positive number ', () => {
      const mockReq = { params: { isComplete: true, id: -1 } };
      const mockRes = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

      taskValidator.patchTaskValidator(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().json).toHaveBeenCalledWith({ message: '"id" must be a positive number' });
    });
  });
});