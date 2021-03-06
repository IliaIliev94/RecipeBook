using API.Data;
using API.Data.Models;
using API.Models.Comments;
using API.Models.Recipes;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeBookContext context;
        private readonly IUserService userService;

        public RecipesController(RecipeBookContext context, IUserService userService)
        {
            this.context = context;
            this.userService = userService;
        }

        [HttpGet]
        public IEnumerable<RecipeCatalogViewModel> GetRecipes()
        {
            return context.Recipes
                .OrderByDescending(recipe => recipe.RecipeLikes.Count)
                .Select(recipe => new RecipeCatalogViewModel
                {
                    Id = recipe.Id,
                    Title = recipe.Title,
                    ImageURI = recipe.ImageURI,
                    Description = recipe.Description.Substring(0, 100),
                    MinMinutes = recipe.MinMinutes,
                    MaxMinutes = recipe.MaxMinutes,
                    UsersLiked = recipe.RecipeLikes.Select(like => like.User.Username).ToList(),
                })
                .ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<RecipeDetailsViewModel> GetRecipe(Guid id)
        {
            var recipe = this.context
                .Recipes
                .Include(recipe => recipe.Creater)
                .Include(recipe => recipe.Comments)
                .ThenInclude(comment => comment.User)
                .FirstOrDefault(recipe => recipe.Id == id);


            if(recipe == null)
            {
                return NotFound();
            }

            var result = new RecipeDetailsViewModel
            {
                Title = recipe.Title,
                Description = recipe.Description,
                ImageURI = recipe.ImageURI,
                MinMinutes = recipe.MinMinutes,
                MaxMinutes = recipe.MaxMinutes,
                IsOwner = User.Identity.IsAuthenticated ? recipe.UserId == this.context.Users.FirstOrDefault(user => user.Username == User.Identity.Name).Id : false,
                Username = recipe.Creater.Username,
                UserImage = recipe.Creater.ImageName,
                UsersLiked = context.Likes.Where(like => like.RecipeId == id).Select(like => like.User.Username).ToList(),
                Comments = recipe.Comments.OrderByDescending(comment => comment.Date).Select(comment => new CommentViewModel 
                    { 
                        Id = comment.Id,
                        Message = comment.Message, 
                        Date = comment.Date.ToString("dd MMM yyyy"),
                        Username = comment.User.Username,
                        UserImage = comment.User.ImageName,
                    })
                .ToList()
            };

            return result;
        }

        [HttpPost]
        [Authorize]
        public IActionResult CreateRecipe([FromBody] RecipeInputModel recipe)
        {

            var newRecipe = new Recipe
            {
                Title = recipe.Title,
                ImageURI = recipe.ImageURI,
                Description = recipe.Description,
                MinMinutes = recipe.MinMinutes,
                MaxMinutes = recipe.MaxMinutes,
                UserId = this.context.Users.FirstOrDefault(user => user.Username == User.Identity.Name).Id,
            };

            context.Recipes.Add(newRecipe);
            context.SaveChanges();

            var result = context.Recipes.FirstOrDefault(recipe => recipe.Id == newRecipe.Id);

            return Ok(newRecipe.Id);
        }

        [HttpPut("edit/{id}")]
        [Authorize]
        public IActionResult EditRecipe(Guid id, [FromBody] RecipeEditInputModel recipe)
        {
            var recipeToEdit = this.context.Recipes.FirstOrDefault(x => x.Id == id);
            if(recipeToEdit == null)
            {
                return NotFound();
            }

            recipeToEdit.Title = recipe.Title;
            recipeToEdit.Description = recipe.Description;
            recipeToEdit.ImageURI = recipe.ImageURI;
            recipeToEdit.MinMinutes = recipe.MinMinutes;
            recipeToEdit.MaxMinutes = recipe.MaxMinutes;

            this.context.SaveChanges();

            return Ok(recipeToEdit.Id);
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public IActionResult DeleteRecipe(Guid id)
        {
            var recipe = this.context.Recipes.FirstOrDefault(x => x.Id == id);
            if(recipe == null)
            {
                return NotFound();
            }

            var userId = this.context.Users.FirstOrDefault(user => user.Username == User.Identity.Name).Id;
            if(userId != recipe.UserId)
            {
                return Unauthorized();
            }

            this.context.Recipes.Remove(recipe);
            this.context.SaveChanges();

            return Ok();
        }

        [HttpGet("user-recipes/{username?}")]
        public ActionResult<UserDetailsViewModel> UserRecipes(string? username=null)
        {

            if(username == null && !User.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            var userId = username == null ? this.userService.GetUserId(User.Identity.Name) : this.userService.GetUserId(username);

            var result = this.context.Users.Where(user => user.Id == userId)
                .Select(user => new UserDetailsViewModel
                {
                    Username = username == null ? null : user.Username,
                    ImageName = username == null ? null : user.ImageName,
                    Recipes = user.Recipes.OrderByDescending(recipe => recipe.RecipeLikes.Count).Select(recipe => new RecipeCatalogViewModel
                    {
                        Id = recipe.Id,
                        Title = recipe.Title,
                        ImageURI = recipe.ImageURI,
                        Description = recipe.Description.Substring(0, 100),
                        MinMinutes = recipe.MinMinutes,
                        MaxMinutes = recipe.MaxMinutes,
                        UsersLiked = recipe.RecipeLikes.Select(like => like.User.Username).ToList(),
                    }).ToList()
                }).First();

            return result;
        }
    }
}