using System;
using System.Collections.Generic;

namespace API.Data.Models
{
    public class User
    {
        public User()
        {
            this.Recipes = new HashSet<Recipe>();
            this.UserLikes = new HashSet<RecipeLike>();
            this.Comments = new HashSet<Comment>();
        }

        public Guid Id { get; init; }

        public string Username { get; set; }

        public string ImageName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public virtual ICollection<Recipe> Recipes { get; set; }

        public virtual ICollection<RecipeLike> UserLikes { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
