using API.Data;
using API.Data.Models;
using API.Services.Models;
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

        public bool EmailIsTaken(string email)
        {
            return this.context.Users.Any(user => user.Email == email);
        }

        public bool IsAnExistingUser(string userName)
        {
            return this.context.Users.Any(user => user.Username == userName);
        }

        public bool IsValidUserCredentials(string userName, string password)
        {
            var hashedPassword = PasswordHasher.ComputeSha256Hash(password);
            return this.context.Users.Any(user => user.Username == userName && hashedPassword == user.Password);
        }

        public void CreateUser(string username, string email, string password, string imageName)
        {
            var user = new User
            {
                Username = username,
                Email = email,
                Password = PasswordHasher.ComputeSha256Hash(password),
                ImageName = imageName,
            };

            context.Users.Add(user);
            context.SaveChanges();
        }

        public UserData GetUserData(string username)
        {
            var user = this.context.Users.FirstOrDefault(user => user.Username == username);

            var userData = new UserData { Username = user.Username, UserImage = user.ImageName };

            return userData;
        }
    }
}
