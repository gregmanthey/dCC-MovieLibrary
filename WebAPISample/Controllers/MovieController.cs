using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    public class MovieController : ApiController
    {
        ApplicationDbContext db;
        public MovieController()
        {
            db = new ApplicationDbContext();
        }
        // GET api/values
        public IHttpActionResult Get()
        {
            // Retrieve all movies from db logic
            var movies = db.Movies.ToList();
            return Ok(movies);
        }

        // GET api/values/5
        public IHttpActionResult Get(int id)
        {
            // Retrieve movie by id from db logic
            var movie = db.Movies.Find(id);
            if (movie is null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

        // POST api/values
        public IHttpActionResult Post([FromBody]Movie value)
        {
            // Create movie in db logic
            var movieInDb = db.Movies.SingleOrDefault(m => m.MovieId == value.MovieId);
            if (movieInDb is null)
            {
                try
                {
                    var newMovie = db.Movies.Add(value);
                    db.SaveChanges();
                    return Content(HttpStatusCode.Created, newMovie);
                }
                catch (Exception)
                {
                    return InternalServerError(new Exception("Error, unable to create new row in database from supplied data"));
                }

            }
            else
            {
                return Ok(Update(movieInDb.MovieId, value));
            }
        }

        // PUT api/values/5
        public IHttpActionResult Put(int id, [FromBody]Movie value)
        {
            // Update movie in db logic
            var foundMovie = Update(id, value);
            if (foundMovie is null)
            {
                return NotFound();
            }
            return Ok(foundMovie);
        }

        private Movie Update(int id, Movie value)
        {
            // Update movie in db logic
            var foundMovie = db.Movies.SingleOrDefault(m => m.MovieId == id);
            if (foundMovie is null || value is null)
            {
                return null;
            }

            try
            {
                foundMovie.Title = value.Title;
                foundMovie.Director = value.Director;
                foundMovie.Genre = value.Genre;
                db.SaveChanges();
                return foundMovie;
            }
            catch (Exception)
            {
                throw new Exception("Problem updating row in database");
            }
        }

        // DELETE api/values/5
        public IHttpActionResult Delete(int id)
        {
            // Delete movie from db logic
            try
            {
                var deleteMovie = db.Movies.Find(id);
                db.Movies.Remove(deleteMovie);
                db.SaveChanges();
                return Ok($"Movie at id {id} removed. Movie title was {deleteMovie.Title}");
            }
            catch (Exception)
            {
                return NotFound();
            }

        }
    }

}