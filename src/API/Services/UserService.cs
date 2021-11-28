using API.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly RecipeBookContext context;

        public UserService(RecipeBookContext context)
        {
            this.context = context;
        }

        public bool IsAnExistingUser(string userName)
        {
            return this.context.Users.Any(user => user.Username == userName);
        }

        public bool IsValidUserCredentials(string userName, string password)
        {
            return this.context.Users.Any(user => user.Username == userName && user.Password == password);
        }
    }
}
