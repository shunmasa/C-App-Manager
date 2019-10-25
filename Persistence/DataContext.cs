using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  public class DataContext : DbContext//entity framework migration
  {
    public DataContext(DbContextOptions options) : base(options)
    {

    }
    //set entity using the domain //values table names
    public DbSet<Value> Values { get; set; }
    //protected only accessible from same class and any dreive class

    //void not return anything
    protected override void OnModelCreating(ModelBuilder builder){
        builder.Entity<Value>()
        .HasData(
            new Value{Id = 1,Name = "Value 101"},
             new Value{Id = 2,Name = "Value 102"},
              new Value{Id = 3,Name = "Value 103"}
        );
    }

  }
}
