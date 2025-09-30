// life-assistant-pwa/src/pages/TasksScreen.jsx
import React, { useState, useEffect } from 'react';
import { createTask, getAllTasks } from '../services/api'; 
import '../App.css'; 

const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Function to Fetch All Tasks (from the stubbed backend)
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Could not fetch tasks. Ensure Node.js backend is running!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle Task Creation (Testing POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const stubbedTask = await createTask({ title: newTaskTitle.trim() });
      setTasks(prevTasks => [...prevTasks, stubbedTask]); 
      setNewTaskTitle('');
      console.log("Task Created (Stub Response):", stubbedTask);

    } catch (error) {
      alert("Failed to create task. Check console for details.");
    }
  };

  if (loading) {
    return <div className="loading-screen">Loading Tasks...</div>;
  }

  return (
    <div>
      <h2>📝 Your To-Do List</h2>
      <p>Backend Status: <span style={{color: 'green', fontWeight: 'bold'}}>Online (STUBBED)</span></p>

      {/* Input Form for Testing POST */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New Task Title..."
          style={{ padding: '10px', width: '70%', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '10px' }}>Add Stub Task</button>
      </form>

      {/* Display Stubbed Tasks */}
      <section className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks found. Get started!</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={task.task_id || index} style={{ listStyle: 'none', padding: '10px 0', borderBottom: '1px dotted #eee' }}>
                <input type="checkbox" readOnly={true} style={{ marginRight: '10px' }} />
                <strong>{task.title}</strong> 
                <small style={{ color: '#888' }}> (ID: {task.task_id.substring(0, 8)}...)</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default TasksScreen;