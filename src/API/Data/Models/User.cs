namespace API.Data.Models
{
    public class User
    {
        public User()
        {
            this.Recipes = new HashSet<Recipe>();
        }

        public Guid Id { get; init; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public virtual ICollection<Recipe> Recipes { get; set; }
    }
}
