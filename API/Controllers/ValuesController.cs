using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]

  //generate constructor
  public class ValuesController : ControllerBase
  {
    private readonly DataContext _context;//accecc to class
    public ValuesController(DataContext context)
    {
      _context = context;
    }

    // GET api/values async return Task
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Value>>> Get()
    {
      var values = await _context.Values.ToListAsync();

      return Ok(values);//200 ok response
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public async Task<ActionResult<string>> Get(int id)
    {
      //findAsync ..find end point id syncronessly
      var value = await _context.Values.FindAsync(id);
      return Ok(value);
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
