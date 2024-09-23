using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LogisticAPI.Migrations
{
    /// <inheritdoc />
    public partial class toado : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            /*migrationBuilder.DropForeignKey(
                name: "FK_tblUser_tblRole_Role_id",
                table: "tblUser");*/

         /*   migrationBuilder.DropIndex(
                name: "IX_tblUser_Role_id",
                table: "tblUser");*/

            migrationBuilder.AddColumn<float>(
                name: "Latitude",
                table: "tblUser",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Longitude",
                table: "tblUser",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Latitude",
                table: "tblOrder",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Longitude",
                table: "tblOrder",
                type: "real",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "tblUser");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "tblUser");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "tblOrder");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "tblOrder");

            migrationBuilder.CreateIndex(
                name: "IX_tblUser_Role_id",
                table: "tblUser",
                column: "Role_id");

          /*  migrationBuilder.AddForeignKey(
                name: "FK_tblUser_tblRole_Role_id",
                table: "tblUser",
                column: "Role_id",
                principalTable: "tblRole",
                principalColumn: "Role_id");*/
        }
    }
}
