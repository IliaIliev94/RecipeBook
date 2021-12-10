using API.Data;
using API.Data.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LikesController : ControllerBase
    {

        private readonly RecipeBookContext context;
        private readonly IUserService userService;

        public LikesController(RecipeBookContext context, IUserService userService)
        {
            this.context = context;
            this.userService = userService;
        }

        [Authorize]
        [HttpGet("like/{id}")]
        public IActionResult Like(Guid id)
        {
            var recipeExists = this.context.Recipes.Any(recipe => recipe.Id == id);

            if(!recipeExists)
            {
                return NotFound();
            }

            var like = new RecipeLike
            {
                UserId = userService.GetUserId(User.Identity.Name),
                RecipeId = id,
            };

            this.context.Likes.Add(like);
            this.context.SaveChanges();

            return Ok();
        }

        [Authorize]
        [HttpGet("unlike/{id}")]
        public IActionResult Unlike(Guid id)
        {
            var recipeExists = this.context.Recipes.Any(recipe => recipe.Id == id);

            if(!recipeExists)
            {
                return NotFound();
            }

            var like = this.context.Likes.FirstOrDefault(like => like.RecipeId == id && like.UserId == this.userService.GetUserId(User.Identity.Name));

            if(like == null)
            {
                return NotFound();
            }

            this.context.Likes.Remove(like);
            this.context.SaveChanges();

            return Ok();
        }
    }
}
