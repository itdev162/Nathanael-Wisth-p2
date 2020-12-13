using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Posts;
using Domain;
using Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly DataContext context;

        public PostsController(IMediator mediator, DataContext context){
            this.mediator = mediator;
            this.context = context;
        }

        public async Task<ActionResult<List<Car>>> List(){
            return await this.mediator.Send(new List.Query());
        }

        /// <summary>
        /// GET api/posts
        /// </summary>
        /// <returns>A list of cars</returns>
        [HttpGet]
        public ActionResult<List<Car>> Get(){
            return this.context.Cars.ToList();
        }

        /// <summary>
        /// GET api/post/[id]
        /// </summary>
        /// <param name="id">Car id</param>
        /// <returns>A single car</returns>
        [HttpGet("{id}")]
        public ActionResult<Car> GetById(Guid id){
            return this.context.Cars.Find(id);
        }

        /// <summary>
        /// POST api/post
        /// </summary>
        ///<param names="request">JSON request containing car fields</param>
        /// <returns>A new car</returns>
        [HttpPost]
        public ActionResult<Car> Create([FromBody]Car request){
            var car = new Car{
                Id = request.Id,
                Year = request.Year,
                Make = request.Make,
                Model = request.Model
            };

            context.Cars.Add(car);
            var success = context.SaveChanges() > 0;

            if(success){
                return car;
            }

            throw new Exception("Error creating post");
        }

        /// <summary>
        /// POST api/post
        /// </summary>
        ///<param names="request">JSON request containing one or more updated car fields</param>
        /// <returns>An updated car</returns>
        [HttpPut]
        public ActionResult<Car> Update([FromBody]Car request){
            var car = context.Cars.Find(request.Id);

            if(car==null){
                throw new Exception("Could not find post");
            }

            car.Year = request.Year != null ? request.Year: car.Year;
            car.Make = request.Make != null ? request.Make : car.Make;
            car.Model = request.Model != null ? request.Model : car.Model;

            var success = context.SaveChanges() > 0;

            if(success){
                return car;
            }

            throw new Exception("Error updating post");
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(Guid id){
            var car = context.Cars.Find(id);

            if(car == null){
                throw new Exception("Could not find post");
            }

            context.Remove(car);

            var success = context.SaveChanges() > 0;

            if(success){
                return true;
            }

            throw new Exception("Error deleting post");
        }
    }
}