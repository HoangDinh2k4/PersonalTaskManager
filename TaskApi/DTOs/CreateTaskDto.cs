using System;
using System.ComponentModel.DataAnnotations;

namespace TaskApi.DTOs
{
    public class CreateTaskDto
    {
        [Required(ErrorMessage = "Tiêu đề là bắt buộc")]
        [StringLength(200, ErrorMessage = "Tiêu đề không được vượt quá 200 ký tự")]
        public string Title { get; set; } = string.Empty;
        
        public string? Description { get; set; }
        
        [Required(ErrorMessage = "Ngày hết hạn là bắt buộc")]
        [DataType(DataType.Date)]
        [FutureOrPresentDate(ErrorMessage = "Ngày hết hạn không thể trong quá khứ")]
        public DateTime DueDate { get; set; }
        
        // Luôn là "Đang làm" - không cho phép client gửi status khác
        public string Status => "Đang làm";
    }

    // Custom validation attribute cho ngày không được trong quá khứ
    public class FutureOrPresentDateAttribute : ValidationAttribute
    {
        // Thêm constructor để khởi tạo ErrorMessage
        public FutureOrPresentDateAttribute()
        {
            ErrorMessage = "Ngày hết hạn không thể trong quá khứ"; 
        }
        
        public FutureOrPresentDateAttribute(string errorMessage)
        {
            ErrorMessage = errorMessage; 
        }

        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            if (value is DateTime date)
            {
                if (date.Date < DateTime.Today)
                {
                    return new ValidationResult(ErrorMessage); 
                }
            }
            return ValidationResult.Success!; 
        }
    }
}