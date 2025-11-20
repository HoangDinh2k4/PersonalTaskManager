import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterTasks from './components/FilterTasks';
import { taskService } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load tasks
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      let data;
      
      if (filter) {
        data = await taskService.getTasksByStatus(filter);
      } else {
        data = await taskService.getAllTasks();
      }
      
      setTasks(data);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Không thể tải danh sách tasks. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  // Create new task
  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      await loadTasks(); // Reload tasks to get updated list
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Không thể tạo task. Vui lòng thử lại.');
    }
  };

  // Update task
  const handleUpdateTask = async (id, taskData) => {
    try {
      await taskService.updateTask(id, taskData);
      await loadTasks(); // Reload tasks to reflect changes
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Không thể cập nhật task. Vui lòng thử lại.');
      throw err; // Re-throw to handle in component
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa task này?')) {
      try {
        await taskService.deleteTask(id);
        await loadTasks(); // Reload tasks to reflect changes
      } catch (err) {
        console.error('Error deleting task:', err);
        setError('Không thể xóa task. Vui lòng thử lại.');
      }
    }
  };

  // Clear error
  const clearError = () => {
    setError('');
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Quản lý Task Cá nhân</h1>
          <p style={styles.subtitle}>Quản lý công việc hàng ngày của bạn</p>
        </header>

        {error && (
          <div style={styles.error}>
            <span>{error}</span>
            <button onClick={clearError} style={styles.closeError}>×</button>
          </div>
        )}

        <main style={styles.main}>
          <TaskForm 
            onSubmit={handleCreateTask}
            existingTasks={tasks} // Truyền danh sách tasks hiện tại
          />
          
          <FilterTasks 
            currentFilter={filter} 
            onFilterChange={setFilter} 
          />
          
          <TaskList
            tasks={tasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            loading={loading}
          />
        </main>

        <footer style={styles.footer}>
          <p>Ứng dụng Quản lý Task - Built with React & .NET 8</p>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0,
  },
  main: {
    flex: 1,
  },
  error: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeError: {
    background: 'none',
    border: 'none',
    color: '#dc2626',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0',
    width: '24px',
    height: '24px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    padding: '20px 0',
    borderTop: '1px solid #e5e7eb',
    color: '#6b7280',
    fontSize: '14px',
  },
};

export default App;