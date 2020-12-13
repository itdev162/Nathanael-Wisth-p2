using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (context.Posts.Count() == 0)
            {
                List<Post> seedPosts = new List<Post>
                {
                    new Post() { Title = "First Post", Body = "This is the body of my first post. It will be use if there is no posts in the database."},
                    new Post() { Title = "Second Post", Body = "This is the body of my second post. It will be use if there is no posts in the database."},
                    new Post() { Title = "Third Post", Body = "This is the body of my third post. It will be use if there is no posts in the database."},
                };

                context.Posts.AddRange(seedPosts);

                context.SaveChanges();
            }

            if(context.Cars.Count() ==0){
                List<Car> seedCars = new List<Car>{
                    new Car() {Year=1999, Make="Toyota", Model="Corolla"},
                    new Car() {Year=2002, Make="Honda", Model="Civic"},
                    new Car() {Year=2020, Make="Mazda", Model="MX-5"},
                };

                context.Cars.AddRange(seedCars);
                context.SaveChanges();
            }
        }
    }
}