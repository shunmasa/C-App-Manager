using System;
using System.Collections.Generic;

using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]//bad requset handler 
  public class ActivitiesController : ControllerBase
  {
    //need root , atribute//controller base derive from controller base class 
    private readonly IMediator _mediator;
    public ActivitiesController(IMediator mediator)
    {
      _mediator = mediator;

    }
    /// end point 
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> List()
    {

      return await _mediator.Send(new List.Query());
    }
    [HttpGet("{id}")]//root activity
                     //specify id 
    public async Task<ActionResult<Activity>> Details(Guid id)
    {
      return await _mediator.Send(new Details.Query { Id = id });
    }
    [HttpPost]//form body to give a hint where to look for property to send it up
    public async Task<ActionResult<Unit>> Create([FromBody]Create.Command command)
    {
      return await _mediator.Send(command);
    }
    [HttpPut("{id}")]
    public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
    {
      command.Id = id;
      return await _mediator.Send(command);

    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
      return await _mediator.Send(new Delete.Command { Id = id });
    }
  }
}