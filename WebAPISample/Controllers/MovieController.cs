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
            try
            {
                var movie = db.Movies.Find(id);
                return Ok(movie);
            }
            catch (Exception)
            {

                return NotFound();
            }

        }

        // POST api/values
        public IHttpActionResult Post([FromBody]Movie value)
        {
            // Create movie in db logic
            var movieInDb = db.Movies.SingleOrDefault(m => m.Title == value.Title && m.Director == value.Director);
            if (movieInDb is null)
            {
                try
                {
                    db.Movies.Add(value);
                    db.SaveChanges();
                    var newMovie = db.Movies.SingleOrDefault(m => m.Title == value.Title && m.Director == value.Director && m.Genre == value.Genre);
                    return Content(HttpStatusCode.Created, newMovie);
                }
                catch (Exception)
                {
                    return InternalServerError(new Exception("Error, unable to create new row in database from supplied data"));
                }

            }
            else
            {
                return Content(HttpStatusCode.Found, Get(movieInDb.MovieId));
            }
        }

        // PUT api/values/5
        public IHttpActionResult Put(int id, [FromBody]Movie value)
        {
            // Update movie in db logic
            var foundMovie = db.Movies.SingleOrDefault(m => m.MovieId == id);
            if (foundMovie is null)
            {
                return NotFound();
            }

            try
            {
                foundMovie.Title = value.Title;
                foundMovie.Director = value.Director;
                foundMovie.Genre = value.Genre;
                db.SaveChanges();
                return Ok(foundMovie);
            }
            catch (Exception)
            {
                return Content(HttpStatusCode.InternalServerError, foundMovie);
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