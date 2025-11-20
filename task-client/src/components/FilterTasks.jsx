import React from 'react';

const FilterTasks = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: '', label: 'Tất cả' },
    { value: 'Đang làm', label: 'Đang làm' },
    { value: 'Hoàn thành', label: 'Hoàn thành' }
  ];

  return (
    <div style={styles.container}>
      <span style={styles.label}>Lọc theo trạng thái:</span>
      <div style={styles.filterGroup}>
        {filters.map(filter => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            style={{
              ...styles.filterButton,
              ...(currentFilter === filter.value ? styles.activeFilter : {})
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    color: '#374151',
    fontWeight: '500',
  },
  filterGroup: {
    display: 'flex',
    gap: '8px',
  },
  filterButton: {
    padding: '6px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '20px',
    backgroundColor: 'white',
    color: '#374151',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
  },
  activeFilter: {
    backgroundColor: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6',
  },
};

export default FilterTasks;