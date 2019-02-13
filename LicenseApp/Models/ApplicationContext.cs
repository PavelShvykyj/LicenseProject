using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;



namespace LicenseApp.Models
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<License> Licenses { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            // хотим миграции а в описании метода написано что оно с миграциями не совместимо и само все автоматом делает               
            //Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<License>().Property(e => e.Name).HasMaxLength(150);
            builder.Entity<License>().Property(e => e.UserId).HasMaxLength(450).IsRequired();
            builder.Entity<User>().HasMany(u => u.Licenses).WithOne(l => l.User).HasForeignKey(e => e.UserId);
        }

    }

}
