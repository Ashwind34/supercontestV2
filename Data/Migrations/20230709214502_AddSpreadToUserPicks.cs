using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace supercontestV2.Data.Migrations
{
    public partial class AddSpreadToUserPicks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Spread1",
                table: "UserPicks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Spread2",
                table: "UserPicks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Spread3",
                table: "UserPicks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Spread4",
                table: "UserPicks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Spread5",
                table: "UserPicks",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Spread1",
                table: "UserPicks");

            migrationBuilder.DropColumn(
                name: "Spread2",
                table: "UserPicks");

            migrationBuilder.DropColumn(
                name: "Spread3",
                table: "UserPicks");

            migrationBuilder.DropColumn(
                name: "Spread4",
                table: "UserPicks");

            migrationBuilder.DropColumn(
                name: "Spread5",
                table: "UserPicks");
        }
    }
}
