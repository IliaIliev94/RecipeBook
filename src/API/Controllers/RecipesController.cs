using API.Data;
using API.Data.Models;
using API.Models;
using Microsoft.AspNetCore.Mvc;
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
            };

            return result;
        }

        [HttpPost("create")]
        public IActionResult CreateRecipe([FromBody] RecipeInputModel recipe)
        {
            var newRecipe = new Recipe
            {
                Title = recipe.Title,
                ImageURI = recipe.ImageURI,
                Description = recipe.Description,
                MinMinutes = recipe.MinMinutes,
                MaxMinutes = recipe.MaxMinutes,
                UserId = recipe.UserId,
            };

            context.Recipes.Add(newRecipe);
            context.SaveChanges();

            var result = context.Recipes.FirstOrDefault(recipe => recipe.Id == newRecipe.Id);

            return Ok(result);
        }
    }
}