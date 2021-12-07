using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Recipes
{
    public class RecipeEditInputModel
    {
        public Guid Id { get; init; }
        [Required]
        public string Title { get; set; }

        [Required]
        [RegularExpression(@"https?:\/\/.*\.(?:png|jpg)")]
        public string ImageURI { get; set; }

        public string? Description { get; set; }

        public int? MinMinutes { get; set; }

        public int? MaxMinutes { get; set; }

        public Guid UserId { get; set; }
    }
}
