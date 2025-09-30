// life-assistant-pwa/src/services/api.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- AXIOS INTERCEPTOR ---
// This runs before every request to attach the JWT token if one exists.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set the standard Authorization header for protected routes
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Authentication API Calls ---

/**
 * Registers a new user.
 * Calls: POST /api/v1/auth/register (Public)
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data; // Returns { token, data: { user } }
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Logs in a user and receives a JWT token.
 * Calls: POST /api/v1/auth/login (Public)
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data; // Returns { token, data: { userId } }
  } catch (error) {
    throw error.response?.data || error;
  }
};


// --- EXISTING MODULE API CALLS (Simplified for clarity) ---

// Tasks Module
export const createTask = (taskData) => api.post('/tasks', taskData).then(res => res.data.data.task);
export const getAllTasks = () => api.get('/tasks').then(res => res.data.data.tasks);

// Calendar Module
export const createEvent = (eventData) => api.post('/calendar/events', eventData).then(res => res.data.data.event);
export const getEventsByRange = (start, end) => api.get('/calendar/events', { params: { start, end } }).then(res => res.data.data.events);

// Shopping List Module
export const createList = (listData) => api.post('/shopping/lists', listData).then(res => res.data.data.list);
export const getAllLists = () => api.get('/shopping/lists').then(res => res.data.data.lists);
export const createItem = (listId, itemData) => api.post(`/shopping/lists/${listId}/items`, itemData).then(res => res.data.data.item);
export const getItemsByListId = (listId) => api.get(`/shopping/lists/${listId}/items`).then(res => res.data.data.items);
export const toggleItemStatus = (itemId, isChecked) => api.patch(`/shopping/items/${itemId}/check`, { is_checked: isChecked }).then(res => res.data.data.item);

// Workouts Module
export const getExerciseLibrary = () => api.get('/workouts/library/exercises').then(res => res.data.data.library);
export const logWorkoutSession = (sessionData) => api.post('/workouts/log', sessionData).then(res => res.data.data.session);
export const getWorkoutHistory = () => api.get('/workouts/log').then(res => res.data.data.sessions);
export const createWorkoutPlan = (planData) => api.post('/workouts/plans', planData).then(res => res.data.data.plan);

// Journal Module
export const createJournalEntry = (entryData) => api.post('/journal/entries', entryData).then(res => res.data.data.entry);
export const getAllJournalEntries = () => api.get('/journal/entries').then(res => res.data.data.entries);
export const getDailyPrompt = () => api.get('/journal/daily-prompt').then(res => res.data.data.prompt);

// Goals Module
export const getAllGoals = () => api.get('/goals').then(res => res.data.data.goals);
export const createGoal = (goalData) => api.post('/goals', goalData).then(res => res.data.data.goal);
export const getMilestonesByGoalId = (goalId) => api.get(`/goals/${goalId}/milestones`).then(res => res.data.data.milestones);
export const updateMilestone = (milestoneId, updates) => api.patch(`/milestones/${milestoneId}`, updates).then(res => res.data.data.milestone);

// Golf Module
export const logGolfSession = (sessionData) => api.post('/golf/sessions', sessionData).then(res => res.data.data.session);
export const getGolfSessionHistory = () => api.get('/golf/sessions').then(res => res.data.data.sessions);
export const getGolfProgress = (metricKey) => api.get('/golf/progress', { params: { metricKey } }).then(res => res.data.data.progress);


export default api;