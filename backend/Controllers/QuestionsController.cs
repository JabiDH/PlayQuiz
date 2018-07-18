using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Questions")]
    public class QuestionsController : Controller
    {
        private readonly QuizContext context;

        public QuestionsController(QuizContext context)
        {
            this.context = context;
            if (this.context.Quizzes.Count() == 0)
            {
                var questions = new List<Question>();
                for (int i = 1; i <= 5; i++)
                {
                    var ques = new Question() { Id = i, Text = $"Question#{i}", QuizId = 1 };
                    questions.Add(ques);
                }
                var quiz = new Quiz() { Id = 1, Title = "Quiz", Questions = questions};
                this.context.Quizzes.Add(quiz);
                this.context.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {            
            return Ok(context.Questions.ToList());
        }

        [HttpGet("{quizId}")]
        public async Task<IActionResult> Get([FromRoute] int quizId)
        {
            var quiz = this.context.Quizzes.SingleOrDefaultAsync(q => q.Id == quizId).Result;
            if (quiz == null)
            {
                return NotFound();
            }
            var questions = this.context.Questions.Where(q => q.QuizId == quizId).ToListAsync().Result;            
            return Ok(questions);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Question question)
        {
            if (question == null || string.IsNullOrWhiteSpace(question.Text))
            {
                return NoContent();
            }
            Quiz quiz = context.Quizzes.SingleOrDefaultAsync<Quiz>(q => q.Id == question.QuizId).Result;
            if (quiz == null)
            {
                return NotFound();                
            }
            Question newQuestion = context.Questions.Add(question).Entity;
            await context.SaveChangesAsync();
            return Ok(newQuestion);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Question question)
        {
            if (id != question.Id)
            {
                return BadRequest();
            }
            context.Entry(question).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(question);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var question = this.context.Questions.SingleOrDefaultAsync(ques => ques.Id == id).Result;
            if (question != null)
            {
                context.Entry(question).State = EntityState.Deleted;
                await context.SaveChangesAsync();
                return Ok(question);
            }
            else
            {
                return NotFound(id);
            }
        }
        
    }
}
