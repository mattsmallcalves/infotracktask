using Microsoft.EntityFrameworkCore;
using infotrackbe.Domain.Entities;

namespace infotrackbe.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<History> Histories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<History>()
                .ToTable("sysHistory")
                .HasKey(h => h.Id);

            modelBuilder.Entity<History>()
                .Property(h => h.Id)
                .ValueGeneratedNever(); 
        }
    }
}
