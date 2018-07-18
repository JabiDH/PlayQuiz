using backend.Models;
using FluentAssertions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using Xunit;

namespace backend_xunit
{
    public class QuestionsControllerTest
    {
        TestClientProvider provider;

        public QuestionsControllerTest()
        {
            this.provider = new TestClientProvider();            
        }

        [Fact]
        public async void TestGetQuestions()
        {
            using (var client = provider.Client)
            {
                var response = await client.GetAsync("/api/questions");
                response.EnsureSuccessStatusCode();
                response.StatusCode.Should().Be(HttpStatusCode.OK);                
            }
        }
        [Fact]
        public async void TestGetQuestionByQuizId ()
        {
            using (var client = provider.Client)
            {
                var response = await client.GetAsync("/api/questions/1");
                response.EnsureSuccessStatusCode();                
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);                
            }
        }

        [Fact]
        public async void TestAddQuestion()
        {
            using (var client = provider.Client)
            {
                var response = await client.PostAsync("/api/questions", 
                    new StringContent(
                        JsonConvert.SerializeObject(new Question() { Id = 1, Text = "Question", QuizId = 1}), System.Text.Encoding.UTF8, "application/json"));
                response.EnsureSuccessStatusCode();
                response.StatusCode.Should().Be(HttpStatusCode.OK);                
            }
        }
    }
}
