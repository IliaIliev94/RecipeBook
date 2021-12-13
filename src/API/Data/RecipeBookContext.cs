using API.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class RecipeBookContext : DbContext
    {
        public RecipeBookContext(DbContextOptions<RecipeBookContext> options)
            : base(options)
        {

        }

        public DbSet<Recipe> Recipes { get; init; }
        public DbSet<User> Users { get; init; }
        public DbSet<RecipeLike> Likes { get; init; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(RecipeBookContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
