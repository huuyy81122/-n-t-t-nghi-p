using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LogisticAPI.Migrations
{
    /// <inheritdoc />
    public partial class toado1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Latitude",
                table: "Users",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Longitude",
                table: "Users",
                type: "real",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Users");
        }
    }
}
