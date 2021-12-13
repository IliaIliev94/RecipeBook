using API.Models.Comments;
using System.Collections.Generic;

namespace API.Models.Recipes
{
    public class RecipeDetailsViewModel
    {

        public RecipeDetailsViewModel()
        {
            this.UsersLiked = new HashSet<string>();
            this.Comments = new HashSet<CommentViewModel>();
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

        public IEnumerable<CommentViewModel> Comments { get; set; }
    }
}
