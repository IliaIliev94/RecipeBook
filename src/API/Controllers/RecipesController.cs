using API.Data;
using API.Data.Models;
using API.Models;
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

        public RecipesController(RecipeBookContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<RecipeCatalogViewModel> GetRecipes()
        {
            return context.Recipes
                .Select(recipe => new RecipeCatalogViewModel
                {
                    Id = recipe.Id,
                    Title = recipe.Title,
                    ImageURI = recipe.ImageURI,
                    Description = recipe.Description.Substring(0, 100),
                    MinMinutes = recipe.MinMinutes,
                    MaxMinutes = recipe.MaxMinutes,
                })
                .ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<RecipeDetailsViewModel> GetRecipe(Guid id)
        {
            var recipe = this.context
                .Recipes
                .Include(recipe => recipe.Creater)
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

            return Ok();
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

            return Ok();
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

        [HttpGet("user-recipes/{id:Guid?}")]
        public IEnumerable<RecipeCatalogViewModel> UserRecipes(Guid? id)
        {
            var userId = id == null ? this.context.Users.FirstOrDefault(user => user.Username == User.Identity.Name).Id : id;

            var recipes = this.context.Recipes.Where(recipe => recipe.UserId == userId)
                .Select(recipe => new RecipeCatalogViewModel
                {
                    Id = recipe.Id,
                    Title = recipe.Title,
                    ImageURI = recipe.ImageURI,
                    Description = recipe.Description.Substring(0, 100),
                    MinMinutes = recipe.MinMinutes,
                    MaxMinutes = recipe.MaxMinutes,
                }).ToList();

            return recipes;
        }
    }
}