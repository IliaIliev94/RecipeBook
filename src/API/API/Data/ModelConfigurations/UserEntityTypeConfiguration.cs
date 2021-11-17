using API.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.ModelConfigurations
{
    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .Property(x => x.Username)
                .HasMaxLength(50);

            builder
                .Property(x => x.Password)
                .HasMaxLength(50);

            builder
                .HasMany(x => x.Recipes)
                .WithOne(x => x.Creater)
                .HasForeignKey(x => x.UserId);
        }
    }
}
