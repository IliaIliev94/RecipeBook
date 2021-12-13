using System;
using System.Collections.Generic;

namespace API.Data.Models
{
    public class Recipe
    {
        public Recipe()
        {
            this.RecipeLikes = new HashSet<RecipeLike>();
            this.Comments = new HashSet<Comment>();
        }
        public Guid Id { get; init; }

        public string Title { get; set; }

        public string ImageURI { get; set; }

        public string? Description { get; set; }

        public int MinMinutes { get; set; }

        public int MaxMinutes { get; set; }

        public Guid UserId { get; set; }

        public User Creater { get; set; }

        public virtual ICollection<RecipeLike> RecipeLikes { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
