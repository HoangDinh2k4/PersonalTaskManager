import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setError('');
      setLoading(true);
      await onUpdate(task.id, editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
      // Hiển thị message lỗi từ backend
      setError(error.message || 'Không thể cập nhật task');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
    setError('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getStatusColor = (status) => {
    return status === 'Hoàn thành' ? '#10b981' : '#f59e0b';
  };

  return (
    <div className="task-item" style={styles.taskItem}>
      {error && (
        <div style={styles.error}>
          <span>{error}</span>
          <button onClick={() => setError('')} style={styles.closeError}>×</button>
        </div>
      )}
      
      {isEditing ? (
        <div style={styles.editForm}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tiêu đề *</label>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Mô tả</label>
            <textarea
              value={editedTask.description || ''}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              style={styles.textarea}
              placeholder="Mô tả..."
              disabled={loading}
            />
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Hạn hoàn thành *</label>
              <input
                type="date"
                value={editedTask.dueDate.split('T')[0]}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                min={getTodayDate()}
                style={styles.input}
                disabled={loading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Trạng thái</label>
              <select
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                style={styles.select}
                disabled={loading}
              >
                <option value="Đang làm">Đang làm</option>
                <option value="Hoàn thành">Hoàn thành</option>
              </select>
            </div>
          </div>

          <div style={styles.editButtons}>
            <button 
              onClick={handleSave} 
              style={styles.saveButton}
              disabled={loading}
            >
              {loading ? 'Đang lưu...' : 'Lưu'}
            </button>
            <button 
              onClick={handleCancel} 
              style={styles.cancelButton}
              disabled={loading}
            >
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <>
          <div style={styles.taskHeader}>
            <h3 style={styles.taskTitle}>{task.title}</h3>
            <span 
              style={{
                ...styles.status,
                backgroundColor: getStatusColor(task.status)
              }}
            >
              {task.status}
            </span>
          </div>
          
          {task.description && (
            <p style={styles.description}>{task.description}</p>
          )}
          
          <div style={styles.taskFooter}>
            <span style={styles.dueDate}>
              📅 Hạn: {formatDate(task.dueDate)}
            </span>
            <div style={styles.actions}>
              <button 
                onClick={() => setIsEditing(true)}
                style={styles.editButton}
              >
                Sửa
              </button>
              <button 
                onClick={() => onDelete(task.id)}
                style={styles.deleteButton}
              >
                Xóa
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  taskItem: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  error: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '8px 12px',
    borderRadius: '4px',
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
  },
  closeError: {
    background: 'none',
    border: 'none',
    color: '#dc2626',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '0',
    width: '20px',
    height: '20px',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
  },
  taskTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  status: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'white',
    marginLeft: '12px',
  },
  description: {
    color: '#6b7280',
    fontSize: '14px',
    margin: '8px 0',
    lineHeight: '1.4',
  },
  taskFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px',
  },
  dueDate: {
    fontSize: '14px',
    color: '#6b7280',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  label: {
    marginBottom: '4px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px',
  },
  input: {
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
  },
  textarea: {
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    minHeight: '60px',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  select: {
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: 'white',
  },
  editButtons: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  },
  saveButton: {
    padding: '8px 16px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    opacity: 1,
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

// Thêm style cho disabled state
const disabledStyle = {
  opacity: 0.6,
  cursor: 'not-allowed',
};

// Áp dụng disabled style
Object.assign(styles.saveButton, {
  '&:disabled': disabledStyle
});
Object.assign(styles.cancelButton, {
  '&:disabled': disabledStyle
});

export default TaskItem;