import axios from 'axios';

const API_BASE_URL = 'http://localhost:5199/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // GET all tasks
  getAllTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  // GET tasks by status
  getTasksByStatus: async (status) => {
    const response = await api.get(`/tasks?status=${encodeURIComponent(status)}`);
    return response.data;
  },

  // GET task by ID
  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // CREATE new task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // UPDATE task
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      // Xử lý lỗi từ backend
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || error.response.data.message || 'Có lỗi xảy ra';
        throw new Error(errorMessage);
      }
      throw error;
    }
  },

  // DELETE task
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;