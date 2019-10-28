using System;

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = CreateWebHostBuilder(args).Build();
      //using satement auto clean up
      using (var scope = host.Services.CreateScope())
      {
        var services = scope.ServiceProvider;
        try
        {
          //difined as data context as percistance
          var context = services.GetRequiredService<DataContext>();
          context.Database.Migrate();
          Seed.SeedData(context);

        }
        catch (Exception ex)
        {
          //specified as ILogger <Program class>
          var logger = services.GetRequiredService<ILogger<Program>>();
          logger.LogError(ex, "An error occured during the migrations");
        }
      }
      host.Run();//host run 

    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>();
  }
}
