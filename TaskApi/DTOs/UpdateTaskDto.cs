using System;
using System.ComponentModel.DataAnnotations;

namespace TaskApi.DTOs
{
    public class UpdateTaskDto
    {
        [Required(ErrorMessage = "Tiêu đề là bắt buộc")]
        [StringLength(200, ErrorMessage = "Tiêu đề không được vượt quá 200 ký tự")]
        public string Title { get; set; } = string.Empty;
        
        public string? Description { get; set; }
        
        [Required(ErrorMessage = "Ngày hết hạn là bắt buộc")]
        [DataType(DataType.Date)]
        [FutureOrPresentDate(ErrorMessage = "Ngày hết hạn không thể trong quá khứ")]
        public DateTime DueDate { get; set; }
        
        [Required(ErrorMessage = "Trạng thái là bắt buộc")]
        [StringLength(50)]
        public string Status { get; set; } = "Đang làm";
    }
}