﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IUserService
    {
        bool IsAnExistingUser(string userName);
        bool EmailIsTaken(string email);
        bool IsValidUserCredentials(string userName, string password);
        void CreateUser(string username, string email, string password, string imageName);
    }
}