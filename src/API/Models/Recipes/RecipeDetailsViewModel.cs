using System.Collections.Generic;

namespace API.Models.Recipes
{
    public class RecipeDetailsViewModel
    {

        public RecipeDetailsViewModel()
        {
            this.UsersLiked = new HashSet<string>();
        }

        public string Title { get; set; }

        public string ImageURI { get; set; }

        public string? Description { get; set; }

        public int? MinMinutes { get; set; }

        public int? MaxMinutes { get; set; }

        public bool IsOwner { get; set; }

        public string Username { get; set; }

        public string UserImage { get; set; }

        public IEnumerable<string> UsersLiked { get; set; }
    }
}
