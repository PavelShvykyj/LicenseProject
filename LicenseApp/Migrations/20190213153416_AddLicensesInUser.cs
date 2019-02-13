using Microsoft.EntityFrameworkCore.Migrations;

namespace LicenseApp.Migrations
{
    public partial class AddLicensesInUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Licenses",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Licenses_UserId",
                table: "Licenses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Licenses_AspNetUsers_UserId",
                table: "Licenses",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_AspNetUsers_UserId",
                table: "Licenses");

            migrationBuilder.DropIndex(
                name: "IX_Licenses_UserId",
                table: "Licenses");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Licenses");
        }
    }
}
