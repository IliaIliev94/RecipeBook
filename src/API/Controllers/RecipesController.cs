using API.Data;
using API.Data.Models;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

        [HttpPost("~/create")]
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