using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.Recipes
{
    public class RecipeInputModel
    {
        [Required]
        public string Title { get; set; }

        [Required]
        [RegularExpression(@"https?:\/\/.*\.(?:png|jpg)")]
        public string ImageURI { get; set; }

        public string? Description { get; set; }

        public int MinMinutes { get; set; }

        public int MaxMinutes { get; set; }

        public Guid UserId { get; set; }
    }
}
