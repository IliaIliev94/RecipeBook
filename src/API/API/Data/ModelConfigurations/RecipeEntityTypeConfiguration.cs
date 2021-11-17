using API.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.ModelConfigurations
{
    public class RecipeEntityTypeConfiguration : IEntityTypeConfiguration<Recipe>
    {
        public void Configure(EntityTypeBuilder<Recipe> builder)
        {
            builder
                .Property(x => x.Title)
                .HasMaxLength(200)
                .IsRequired();

            builder
                .HasOne(x => x.Creater)
                .WithMany(x => x.Recipes)
                .HasForeignKey(x => x.UserId);
        }
    }
}
