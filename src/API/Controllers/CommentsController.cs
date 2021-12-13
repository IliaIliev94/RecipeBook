using API.Data;
using API.Data.Models;
using API.Models.Comments;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly RecipeBookContext context;
        private readonly IUserService userService;
        public CommentsController(RecipeBookContext context, IUserService userService)
        {
            this.context = context;
            this.userService = userService;
        }

        [HttpPost("add")]
        [Authorize]
        public IActionResult Add([FromBody]CommentInputViewModel comment)
        {
            var newComment = new Comment
            {
                Message = comment.Message,
                RecipeId = comment.RecipeId,
                UserId = this.userService.GetUserId(User.Identity.Name)
            };

            this.context.Comments.Add(newComment);
            this.context.SaveChanges();

            var result = new CommentViewModel
            {
                Id = newComment.Id,
                Message = newComment.Message,
                Date = newComment.Date.ToString("dd MMM yyyy"),
                Username = newComment.User.Username,
                UserImage = newComment.User.ImageName,
            };

            return Ok(result);
        }
    }
}
