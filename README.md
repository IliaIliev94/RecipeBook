# RecipeBook

## A web app built with ASP.NET Core and React for creating and sharing recipes for meals

For the best experience it is recommended to run the API server with .NET 6 installed

## How to run the app

1. Clone the repository to your machine.
2. Start the API solution.
3. Open the react project directory (/Client subfolder) and run the command
   "npm install" to install all dependancies.
4. After that start the client app with "npm start".

## Users and permissions

1. Visitors (loget out users) - can view recipes, a list of users and their profiles, as well as register.
2. Loged in users - can access the same functionality that users can in addition to creating a new recipe, editing and deleting recipes, as the homepage being their profile page.

## Structure

### Visitors (loged out users):

1. Home Page (url - "/")
   ![Home page](screenshots/Guest-1.png)
   ![Home page](screenshots/Guest-2.png)
2. Recipes Catalog (url - "/recipes")
   ![Recipes catalog](screenshots/Recipes-catalog-1.png)
   ![Recipes catalog](screenshots/Recipes-catalog-2.png)
3. Recipe Details (url - "/recipe/:id")
   ![Recipe details](screenshots/Recipe-details-1.png)
   ![Recipe details](screenshots/Recipe-details-2.png)
4. Login Form (url - "/login")
   ![Login form](screenshots/Login.png)
5. Register Form (url - "/register")
   ![Register form](screenshots/Register.png)
6. Users Catalog (url - "/users")
   ![Users catalog](screenshots/Users-catalog-1.png)
   ![Users catalog](screenshots/Users-catalog-2.png)
7. User Profile (url - "/users/:username")
   ![User profile](screenshots/User-profile-visitor-1.png)
   ![User profile](screenshots/User-profile-visitor-2.png)

### Loged in users - everything visitors can access (minus register and login) plus:

1.  Home page (url - "/")
    ![User home page](screenshots/User-home-1.png)
    ![User home page](screenshots/User-home-2.png)
2.  Details page of a recipe created by the user (url - "/recipes/:id")
    ![User recipe details page](screenshots/User-recipes-details.png)
3.  Create recipe (url - "/recipes/create")
    ![Create recipe page](screenshots/Create-recipe.png)
4.  Edit recipe (url - "/recipes/edit/:id")
    ![Edit recipe page](screenshots/Edit-recipe-1.png)
    ![Edit recipe page](screenshots/Edit-recipe-2.png)
