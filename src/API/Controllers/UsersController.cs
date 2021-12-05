using API.Data.Models;
using API.Infrastructure;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly IWebHostEnvironment _hostEnvironment;
        public const string defaultAvatar = "default-avatar.png";
        public UsersController(IUserService userService, IJwtAuthManager jwtAuthManager, IWebHostEnvironment hostEnvironment)
        {
            _userService = userService;
            _jwtAuthManager = jwtAuthManager;
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost("register")]
        public ActionResult Register([FromForm] RegisterRequest request)
        {
            if(_userService.IsAnExistingUser(request.Username))
            {
                return BadRequest("Username is taken!");
            }
            else if(_userService.EmailIsTaken(request.Email))
            {
                return BadRequest("Email is taken!");
            }
            else if(request.Password != request.ConfirmPassword)
            {
                return BadRequest("Password and password confirmation don't match");
            }


            request.ImageName = request.Avatar != null ? SaveImage(request.Avatar) : defaultAvatar;

            _userService.CreateUser(request.Username, request.Email, request.Password, request.ImageName);

            var claims = new[]
          {
                new System.Security.Claims.Claim(ClaimTypes.Name, request.Username),
            };

            var jwtResult = _jwtAuthManager.GenerateTokens(request.Username, claims, DateTime.Now);

            Response.Cookies.Append("X-Access-Token", jwtResult.AccessToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure = true });
            Response.Cookies.Append("X-Username", request.Username, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure = true });
            Response.Cookies.Append("X-Refresh-Token", jwtResult.RefreshToken.TokenString, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure = true });

            return Ok();
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginRequest request)
        {
            if (!_userService.IsValidUserCredentials(request.Username, request.Password))
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new System.Security.Claims.Claim(ClaimTypes.Name, request.Username),
            };

            var jwtResult = _jwtAuthManager.GenerateTokens(request.Username, claims, DateTime.Now);

            Response.Cookies.Append("X-Access-Token", jwtResult.AccessToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
            Response.Cookies.Append("X-Username", request.Username, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
            Response.Cookies.Append("X-Refresh-Token", jwtResult.RefreshToken.TokenString, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });

            return Ok();
        }

        [Authorize]
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Append("X-Access-Token", "", new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure = true, Expires = DateTime.Now.AddDays(-1) });
            Response.Cookies.Append("X-Username", "", new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure = true, Expires = DateTime.Now.AddDays(-1) });
            Response.Cookies.Append("X-Refresh-Token", "", new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure = true, Expires = DateTime.Now.AddDays(-1) });
            return Ok();
        }

        [HttpGet("isAuthenticated")]
        public IActionResult IsAuthenticated()
        {
            return Ok(User.Identity.IsAuthenticated);
        }

        [NonAction]
        public string SaveImage(IFormFile imageFile)
        {
            var imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine("../Client/public/images", "Avatars", imageName);

            using(var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                imageFile.CopyTo(fileStream);
            };

            return imagePath.Split('/').Last().Split("\\").Last();
        }
    }
}
