// life-assistant-pwa/src/App.jsx
import React, { useState, useEffect } from 'react';
import { createTask, getAllTasks } from './services/api'; 
import './App.css'; // Assuming you have a default CSS file from Vite setup

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // 1. Function to Fetch All Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      // Calls the function in src/services/api.js -> GET /api/v1/tasks
      const fetchedTasks = await getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Could not fetch tasks. Ensure Node.js backend is running!", error);
    } finally {
      setLoading(false);
    }
  };

  // Run the fetch function when the component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Handle Task Creation (Testing POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      // Calls the function in src/services/api.js -> POST /api/v1/tasks
      const stubbedTask = await createTask({ title: newTaskTitle.trim() });
      
      // Since the backend is stubbed and doesn't store state, we manually add the response
      setTasks(prevTasks => [...prevTasks, stubbedTask]); 
      setNewTaskTitle('');
      console.log("Task Created (Stub Response):", stubbedTask);

    } catch (error) {
      alert("Failed to create task. Check console for details.");
    }
  };

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>LIFE Assistant PWA 📱</h1>
        <p>Backend Status: <span style={{color: 'green', fontWeight: 'bold'}}>Online (STUBBED)</span></p>
      </header>

      {/* Input Form for Testing POST */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New Task Title..."
          style={{ padding: '10px', width: '250px' }}
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '10px' }}>Add Stub Task</button>
      </form>

      {/* Display Stubbed Tasks (GET Results) */}
      <section className="task-list">
        <h2>Tasks (from Backend Stub)</h2>
        {tasks.length === 0 ? (
          <p>No stubbed tasks found. Add one!</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={task.task_id || index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
                <strong>{task.title}</strong> 
                <small> (ID: {task.task_id.substring(0, 8)}...)</small>
                <p>Status: {task.status || 'To Do'}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;