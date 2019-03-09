using backend.Controllers;
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
  public class AccountControllerTest
  {
    TestClientProvider provider;
    public AccountControllerTest()
    {
      this.provider = new TestClientProvider();
    } 
    [Fact]
    public async void TestRegister()
    {
      using (var client = this.provider.Client)
      {
        var response = await client.PostAsync("/api/account",
          new StringContent(
            JsonConvert.SerializeObject(new Credentials(){ Email = "Test@gmail.com", Password = "Pass@123" }), System.Text.Encoding.UTF8, "application/json"));
        response.EnsureSuccessStatusCode();
        response.StatusCode.Should().Be(HttpStatusCode.OK);
      }
    }

    [Fact]
    public async void TestLogin()
    {
      using (var client = this.provider.Client)
      {        
        var response = await client.PostAsync("/api/account/login",
          new StringContent(
            JsonConvert.SerializeObject(new Credentials() { Email = "Test@gmail.com", Password = "Pass@123" }), System.Text.Encoding.UTF8, "application/json"));
        var token = await response.Content.ReadAsStringAsync();
        token.Should().NotBeNull();
        response.EnsureSuccessStatusCode();
        response.StatusCode.Should().Be(HttpStatusCode.OK);

      }
    }

    [Fact]
    public async void TestDeleteAccount()
    {
      using (var client = this.provider.Client)
      {
        var response = await client.PostAsync("/api/account/delete",
          new StringContent(
            JsonConvert.SerializeObject(new Credentials() { Email = "Test@gmail.com", Password = "Pass@123" }), System.Text.Encoding.UTF8, "application/json"));
        response.EnsureSuccessStatusCode();
        response.StatusCode.Should().Be(HttpStatusCode.OK);
      }
    }

  }
}
