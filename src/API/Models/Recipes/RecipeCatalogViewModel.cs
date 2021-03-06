using System;
using System.Collections.Generic;

namespace API.Models.Recipes
{
    public sealed class RecipeCatalogViewModel
    {
        public Guid Id { get; init; }

        public string Title { get; set; }

        public string ImageURI { get; set; }

        public string? Description { get; set; }

        public int? MinMinutes { get; set; }

        public int? MaxMinutes { get; set; }

        public IEnumerable<string> UsersLiked { get; set; }
    }
}
