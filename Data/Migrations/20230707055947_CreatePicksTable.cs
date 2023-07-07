using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace supercontestV2.Data.Migrations
{
    public partial class CreatePicksTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "FavTeam",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "UserPicks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    week = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Pick1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pick2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pick3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pick4 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pick5 = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPicks", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserPicks");

            migrationBuilder.AlterColumn<string>(
                name: "FavTeam",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
