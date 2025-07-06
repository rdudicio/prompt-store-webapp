const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

const axios = {
  create: jest.fn(() => mockAxiosInstance),
};

export default axios;
