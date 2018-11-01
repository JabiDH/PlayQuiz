using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services.LoggingService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [Route("api/[controller]")]
  public class ValuesController : Controller
  {
    private readonly ILoggerManager Logger;
    public ValuesController(ILoggerManager logger)
    {
      this.Logger = logger;
    }
    // GET api/values
    [HttpGet]
    public IEnumerable<string> Get()
    {
      Logger.LogInfo("ValuesController -> Get()");
      return new string[] { "value1", "value2" };
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return "value";
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody]string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
