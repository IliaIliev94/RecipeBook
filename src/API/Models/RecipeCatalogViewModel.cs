namespace API.Models
{
    public sealed class RecipeCatalogViewModel
    {
        public string Title { get; set; }

        public string? Description { get; set; }

        public int? MinMinutes { get; set; }

        public int? MaxMinutes { get; set; }
    }
}
