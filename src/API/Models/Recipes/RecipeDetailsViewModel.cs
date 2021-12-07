namespace API.Models.Recipes
{
    public class RecipeDetailsViewModel
    {
        public string Title { get; set; }

        public string ImageURI { get; set; }

        public string? Description { get; set; }

        public int? MinMinutes { get; set; }

        public int? MaxMinutes { get; set; }

        public bool IsOwner { get; set; }

        public string Username { get; set; }

        public string UserImage { get; set; }
    }
}
