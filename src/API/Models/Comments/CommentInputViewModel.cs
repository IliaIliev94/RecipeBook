using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Comments
{
    public class CommentInputViewModel
    {
        public Guid RecipeId { get; set; }
        public string Message { get; set; }
    }
}
