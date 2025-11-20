using Microsoft.EntityFrameworkCore;
using TaskApi.Models;

namespace TaskApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure entity
            modelBuilder.Entity<TaskItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(50);
                entity.Property(e => e.DueDate).HasColumnType("date");
            });

            // Seed data
            modelBuilder.Entity<TaskItem>().HasData(
                new TaskItem { 
                    Id = 1, 
                    Title = "Học React", 
                    Description = "Học React hooks và components",
                    DueDate = new DateTime(2024, 4, 15),
                    Status = "Đang làm",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new TaskItem { 
                    Id = 2, 
                    Title = "Đi chợ", 
                    Description = "Mua thực phẩm cho tuần",
                    DueDate = new DateTime(2024, 4, 20),
                    Status = "Hoàn thành",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new TaskItem { 
                    Id = 3, 
                    Title = "Dọn nhà", 
                    Description = "Dọn dẹp phòng khách và bếp",
                    DueDate = new DateTime(2024, 4, 25),
                    Status = "Đang làm",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            );
        }
    }
}