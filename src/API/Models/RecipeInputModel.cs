using System;

namespace API.Models
{
    public class RecipeInputModel
    {
        public Guid Id { get; init; }

        public string Title { get; set; }

        public string ImageURI { get; set; }

        public string? Description { get; set; }

        public int? MinMinutes { get; set; }

        public int? MaxMinutes { get; set; }

        public Guid UserId { get; set; }
    }
}
