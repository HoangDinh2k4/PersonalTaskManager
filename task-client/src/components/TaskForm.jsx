import React, { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel, existingTasks = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Đang làm'
  });

  const [errors, setErrors] = useState({});

  // Lấy ngày hiện tại định dạng YYYY-MM-DD
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Kiểm tra trùng tên task đang làm
  const isDuplicateTitle = (title) => {
    return existingTasks.some(task => 
      task.title.toLowerCase() === title.toLowerCase() && 
      task.status === 'Đang làm'
    );
  };

  const validateForm = () => {
    const newErrors = {};

    // Kiểm tra tiêu đề
    if (!formData.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề task';
    } else if (isDuplicateTitle(formData.title)) {
      newErrors.title = 'Đã có task đang làm với tiêu đề này';
    }

    // Kiểm tra ngày hết hạn
    if (!formData.dueDate) {
      newErrors.dueDate = 'Vui lòng chọn ngày hết hạn';
    } else if (formData.dueDate < getTodayDate()) {
      newErrors.dueDate = 'Ngày hết hạn không thể trong quá khứ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      status: 'Đang làm'
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error khi user bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.title}>Thêm Task Mới</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tiêu đề *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề task..."
            style={{
              ...styles.input,
              ...(errors.title ? styles.inputError : {})
            }}
            required
          />
          {errors.title && <span style={styles.errorText}>{errors.title}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Nhập mô tả..."
            style={styles.textarea}
            rows="3"
          />
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Hạn hoàn thành *</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={getTodayDate()} // Không cho chọn ngày trong quá khứ
              style={{
                ...styles.input,
                ...(errors.dueDate ? styles.inputError : {})
              }}
              required
            />
            {errors.dueDate && <span style={styles.errorText}>{errors.dueDate}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Trạng thái</label>
            <div style={styles.statusDisplay}>
              <span style={styles.statusBadge}>Đang làm</span>
              <span style={styles.statusNote}>(Mặc định)</span>
            </div>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.submitButton}>
            Thêm Task
          </button>
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              style={styles.cancelButton}
            >
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  title: {
    margin: '0 0 16px 0',
    color: '#1f2937',
    fontSize: '18px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  label: {
    marginBottom: '4px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  textarea: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  statusDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusBadge: {
    padding: '6px 12px',
    backgroundColor: '#f59e0b',
    color: 'white',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  statusNote: {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default TaskForm;