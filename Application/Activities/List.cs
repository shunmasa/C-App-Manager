
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

using Persistence;

namespace Application.Activities
{
  public class List
  {
    public class Query : IRequest<List<Activity>> { }

    public class Handler : IRequestHandler<Query, List<Activity>>
    {
      private readonly DataContext _context;
      //private readonly ILogger<List> _Logger;
      public Handler(DataContext context)
      {
        // _Logger = Logger;
        _context = context;
      }
      //cancel request
      public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
      {


        var activities = await _context.Activities.ToListAsync();

        return activities;
      }
    }
  }
}


//cancellation token
// try
// {
//   for (var i = 0; i < 10; i++)
//   {
//     cancellationToken.ThrowIfCancellationRequested();
//     await Task.Delay(1000, cancellationToken);//delay1000 , and token
//     _Logger.LogInformation($"TASK {i} has completed");
//   }
// }
// catch (Exception ex) when (ex is TaskCanceledException)
// {
//   _Logger.LogInformation("Task has completed");
// }