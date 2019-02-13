using Microsoft.EntityFrameworkCore.Migrations;

namespace LicenseApp.Migrations
{
    public partial class AddLicensesInUserRequired : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_AspNetUsers_UserId",
                table: "Licenses");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Licenses",
                maxLength: 450,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Licenses_AspNetUsers_UserId",
                table: "Licenses",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_AspNetUsers_UserId",
                table: "Licenses");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Licenses",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 450);

            migrationBuilder.AddForeignKey(
                name: "FK_Licenses_AspNetUsers_UserId",
                table: "Licenses",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
