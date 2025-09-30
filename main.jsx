// life-assistant-pwa/src/main.jsx (UPDATED FOR ALL MODULES)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import TasksScreen from './pages/TasksScreen.jsx';
import CalendarScreen from './pages/CalendarScreen.jsx';
import GoalsScreen from './pages/GoalsScreen.jsx';
import WorkoutsScreen from './pages/WorkoutsScreen.jsx'; // NEW
import JournalScreen from './pages/JournalScreen.jsx';   // NEW
import ShoppingListScreen from './pages/ShoppingListScreen.jsx'; // NEW
import GolfTrainerScreen from './pages/GolfTrainerScreen.jsx'; // NEW
import './index.css';

// Define the routes for the entire application
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, 
    errorElement: <div><h1>404 Not Found</h1><p>The page you requested does not exist.</p></div>,
    children: [
      {
        path: '/',
        element: <TasksScreen />, // Default home page
      },
      { path: 'tasks', element: <TasksScreen /> },
      { path: 'calendar', element: <CalendarScreen /> },
      { path: 'goals', element: <GoalsScreen /> },
      { path: 'workouts', element: <WorkoutsScreen /> }, // NEW ROUTE
      { path: 'journal', element: <JournalScreen /> },   // NEW ROUTE
      { path: 'shopping', element: <ShoppingListScreen /> }, // NEW ROUTE
      { path: 'golf', element: <GolfTrainerScreen /> }, // NEW ROUTE
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);