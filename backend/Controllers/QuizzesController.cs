using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Quizzes")]
    public class QuizzesController : Controller
    {

        private readonly QuizContext context;

        public QuizzesController(QuizContext context)
        {
            this.context = context;            
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = HttpContext.User.Claims.First().Value;

            return Ok(context.Quizzes.Where(q => q.OwnerId == userId).ToList());
        }
      
        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllQuizzes()
        {            
            return Ok(context.Quizzes.ToList());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var userId = HttpContext.User.Claims.First().Value;
            var quiz = this.context.Quizzes.Where(q => q.OwnerId == userId).SingleOrDefaultAsync(q => q.Id == id).Result;
            if (quiz != null)
            {
              return Ok(quiz);
            }
            else
            {
              return NotFound(id);
            }      
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Quiz quiz)
        {
            var userId = HttpContext.User.Claims.First().Value;
            quiz.OwnerId = userId;
            context.Quizzes.Add(quiz);
            await context.SaveChangesAsync();
            return Ok(quiz);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Quiz quiz)
        {
            if (id != quiz.Id)
            {
                return BadRequest();
            }
            context.Entry(quiz).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(quiz);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var quiz = this.context.Quizzes.SingleOrDefaultAsync(q => q.Id == id).Result;
            if (quiz != null)
            {
                context.Entry(quiz).State = EntityState.Deleted;
                await context.SaveChangesAsync();
                return Ok(quiz);
            }
            else
            {
                return NotFound(id);
            }
        }
    }
}
