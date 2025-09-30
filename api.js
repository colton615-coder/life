// life-assistant-pwa/src/services/api.js
import axios from 'axios';

// Get the base URL from the front-end environment file (.env)
// import.meta.env is how Vite exposes environment variables prefixed with VITE_
const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    // FUTURE: Authorization: `Bearer ${localStorage.getItem('token')}`
  },
});

/**
 * Service function to create a new task.
 * Calls: POST /api/v1/tasks
 * @param {object} taskData - The task object (title, description, etc.).
 * @returns {Promise<object>} The new task object from the backend (stubbed data).
 */
export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data.data.task;
  } catch (error) {
    console.error('API Error: Failed to create task', error.response || error);
    throw error;
  }
};

/**
 * Service function to fetch all top-level tasks.
 * Calls: GET /api/v1/tasks
 * @returns {Promise<Array<object>>} List of tasks (stubbed data).
 */
export const getAllTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data.data.tasks;
  } catch (error) {
    console.error('API Error: Failed to fetch tasks', error.response || error);
    throw error;
  }
};

// FUTURE: Add more exported functions here for Calendar, Workouts, etc.

export default api;