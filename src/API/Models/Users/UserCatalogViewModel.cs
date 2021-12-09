using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Users
{
    public class UserCatalogViewModel
    {
        public string Username { get; set; }

        public string ImageName { get; set; }

        public int RecipesCount { get; set; }
    }
}
