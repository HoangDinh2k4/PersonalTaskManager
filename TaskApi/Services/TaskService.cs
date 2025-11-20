using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskApi.DTOs;
using TaskApi.Models;
using TaskApi.Repositories;

namespace TaskApi.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            return await _taskRepository.GetAllTasksAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(string status)
        {
            return await _taskRepository.GetTasksByStatusAsync(status);
        }

        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            return await _taskRepository.GetTaskByIdAsync(id);
        }

        public async Task<TaskItem> CreateTaskAsync(CreateTaskDto createTaskDto)
        {
            // 1. KIỂM TRA TRÙNG TÊN (Dùng hàm Repository mới)
            // excludeId = null vì đây là tạo mới
            if (await _taskRepository.ExistsActiveTaskByTitleAsync(createTaskDto.Title))
            {
                throw new InvalidOperationException($"Đã có task đang làm với tiêu đề '{createTaskDto.Title}'");
            }

            // 2. Kiểm tra ngày (Validate)
            if (createTaskDto.DueDate.Date < DateTime.Today)
            {
                throw new InvalidOperationException("Ngày hết hạn không thể trong quá khứ");
            }

            var task = new TaskItem
            {
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                DueDate = createTaskDto.DueDate.Date,
                Status = "Đang làm",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            return await _taskRepository.CreateTaskAsync(task);
        }

        public async Task<TaskItem?> UpdateTaskAsync(int id, UpdateTaskDto updateTaskDto)
        {
            var existingTask = await _taskRepository.GetTaskByIdAsync(id);
            if (existingTask == null) return null;

            // 1. KIỂM TRA TRÙNG TÊN KHI UPDATE
            // Truyền id vào để loại trừ chính task này ra khỏi phép so sánh
            if (await _taskRepository.ExistsActiveTaskByTitleAsync(updateTaskDto.Title, id))
            {
                throw new InvalidOperationException($"Đã có task đang làm với tiêu đề '{updateTaskDto.Title}'");
            }

            // 2. Kiểm tra ngày
            if (updateTaskDto.DueDate.Date < DateTime.Today)
            {
                throw new InvalidOperationException("Ngày hết hạn không thể trong quá khứ");
            }

            existingTask.Title = updateTaskDto.Title;
            existingTask.Description = updateTaskDto.Description;
            existingTask.DueDate = updateTaskDto.DueDate.Date;
            existingTask.Status = updateTaskDto.Status;
            existingTask.UpdatedAt = DateTime.UtcNow;

            return await _taskRepository.UpdateTaskAsync(existingTask);
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            return await _taskRepository.DeleteTaskAsync(id);
        }
    }
}