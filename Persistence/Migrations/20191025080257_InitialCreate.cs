﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
  public partial class InitialCreate : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "Values",
          columns: table => new
          {
                  //primary key 
                  Id = table.Column<int>(nullable: false)
                  .Annotation("Sqlite:Autoincrement", true),
            Name = table.Column<string>(nullable: true)//string value
                },
          constraints: table =>
          {
            table.PrimaryKey("PK_Values", x => x.Id);
          });//constraint column of data base 
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "Values");
    }
  }
}
