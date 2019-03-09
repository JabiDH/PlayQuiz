using backend.Models;
using backend.Controllers;
using FluentAssertions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using Xunit;

namespace backend_xunit
{  
  public class QuizzesControllerTest
  {
    TestClientProvider Provider;

    public QuizzesControllerTest()
    {
      this.Provider = new TestClientProvider();
    }

    [Fact]
    public async void TestAddQuiz()
    {
      using (var client = Provider.Client)
      {
        var response = await client.PostAsync("/api/account/login",
          new StringContent(
            JsonConvert.SerializeObject(new Credentials() { Email = "Test@gmail.com", Password = "Pass@123" }), System.Text.Encoding.UTF8, "application/json"));
        var token = await response.Content.ReadAsStringAsync();
        token = token.ToString().Substring(1, token.Length - 2);

        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        client.DefaultRequestHeaders.Add("username", "Test@gmail.com");

        for (int i = 0; i < 100000; i++)
        {
          response = await client.PostAsync("/api/quizzes",
            new StringContent(
                JsonConvert.SerializeObject(new Quiz() { Title = "Quiz", Level = Level.Easy }), System.Text.Encoding.UTF8, "application/json"));
        }       

        response.EnsureSuccessStatusCode();
        response.StatusCode.Should().Be(HttpStatusCode.OK);
      }
    }

    [Fact]
    public async void TestDeleteAllQuizzes()
    {
      using (var client = this.Provider.Client)
      {
        var response = await client.PostAsync("/api/account/login",
          new StringContent(
            JsonConvert.SerializeObject(new Credentials() { Email = "Test@gmail.com", Password = "Pass@123" }), System.Text.Encoding.UTF8, "application/json"));
        var token = await response.Content.ReadAsStringAsync();
        token = token.ToString().Substring(1, token.Length - 2);

        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        client.DefaultRequestHeaders.Add("username", "Test@gmail.com");
        
        response = await client.DeleteAsync("/api/quizzes/DeleteAll");        

        response.EnsureSuccessStatusCode();
        response.StatusCode.Should().Be(HttpStatusCode.OK);

      }
    }

  }

  

}
