using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Quiz
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string OwnerId { get; set; }
        public Level Level { get; set; }
        public List<Question> Questions { get; set; }
    }

    public enum Level
    {
        Easy,
        Meduim,
        Hard,
        Difficult
    }
}
