using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    //[Route("api/Movies")]
    public class MovieController : ApiController
    {
        ApplicationDbContext db;
        public MovieController()
        {
            db = new ApplicationDbContext();
        }
        // GET api/values
        //[HttpGet]
        //[Route("GetMovies")]
        public IEnumerable<Movie> Get()
        {
            // Retrieve all movies from db logic
            var movies = db.Movies.ToList();
            return movies;
        }

        // GET api/values/5
        public Movie Get(int id)
        {
            // Retrieve movie by id from db logic
            var movie = db.Movies.Find(id);
            return movie;
        }

        // POST api/values
        public void Post([FromBody]Movie value)
        {
            // Create movie in db logic
            db.Movies.Add(value);
            db.SaveChanges();
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
            // Update movie in db logic
            var foundMovie = db.Movies.SingleOrDefault(m => m.MovieId == id);
            foundMovie.Title = value;
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            // Delete movie from db logic
            var deleteMovie = db.Movies.Find(id);
            db.Movies.Remove(deleteMovie);
            db.SaveChanges();
        }
    }

}