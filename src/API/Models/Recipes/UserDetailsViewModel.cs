using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Recipes
{
    public class UserDetailsViewModel
    {

        public UserDetailsViewModel()
        {
            this.Recipes = new HashSet<RecipeCatalogViewModel>();
        }
        public string Username { get; set; }
        public string ImageName { get; set; }
        public IEnumerable<RecipeCatalogViewModel> Recipes { get; set; }
    }
}
