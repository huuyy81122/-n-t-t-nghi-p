using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LogisticAPI.Migrations
{
    /// <inheritdoc />
    public partial class tablevote : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           /* migrationBuilder.CreateTable(
                name: "BaiHocs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenBaiHoc = table.Column<string>(type: "NVARCHAR(120)", nullable: true),
                    NoiDung = table.Column<string>(type: "NVARCHAR(120)", nullable: true),
                    MoTa = table.Column<string>(type: "NVARCHAR(120)", nullable: true),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR(120)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiHocs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietKhoaHocs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdKhoaHoc = table.Column<int>(type: "INT", nullable: false),
                    IdBaiHoc = table.Column<int>(type: "INT", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietKhoaHocs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DangKys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser = table.Column<int>(type: "INT", nullable: false),
                    IdKhoaHoc = table.Column<int>(type: "INT", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DangKys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmailTemplate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmailCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailTemplate", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GioHang",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser = table.Column<int>(type: "INT", nullable: false),
                    IdKhoaHoc = table.Column<int>(type: "INT", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: true),
                    CreateBy = table.Column<string>(type: "NVARCHAR(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GioHang", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KhoaHocs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenKhoaHoc = table.Column<string>(type: "NVARCHAR(MAX)", nullable: false),
                    Thumnail = table.Column<string>(type: "NVARCHAR(MAX)", nullable: true),
                    GiaGoc = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false),
                    GiaGiam = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false),
                    LuotBan = table.Column<int>(type: "int", nullable: false),
                    DiemDanhGia = table.Column<int>(type: "int", nullable: false),
                    NoiDung = table.Column<string>(type: "NVARCHAR(MAX)", nullable: true),
                    GioiThieu = table.Column<string>(type: "NVARCHAR(MAX)", nullable: true),
                    TheLoai = table.Column<string>(type: "VARCHAR(MAX)", nullable: true),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: true),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: true),
                    CreateBy = table.Column<string>(type: "NVARCHAR(MAX)", nullable: false),
                    YeuThich = table.Column<bool>(type: "BIT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhoaHocs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdKhoaHoc = table.Column<int>(type: "INT", nullable: false),
                    IdUser = table.Column<int>(type: "INT", nullable: false),
                    HoTen = table.Column<string>(type: "NVARCHAR(255)", maxLength: 255, nullable: false),
                    TenKhoaHoc = table.Column<string>(type: "NVARCHAR(255)", maxLength: 255, nullable: false),
                    Gia = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false),
                    NoiDung = table.Column<string>(type: "VARCHAR(255)", maxLength: 255, nullable: false),
                    AnhChuyenKhoan = table.Column<string>(type: "NVARCHAR(255)", maxLength: 255, nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR(255)", maxLength: 255, nullable: false),
                    TrangThai = table.Column<bool>(type: "BIT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PermissionsName = table.Column<string>(type: "NVARCHAR(255)", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PermissionsRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdRole = table.Column<int>(type: "INT", nullable: false),
                    IdPermissions = table.Column<int>(type: "INT", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionsRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "NVARCHAR(255)", nullable: false),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreateBy = table.Column<string>(type: "NVARCHAR", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblCommune",
                columns: table => new
                {
                    Commune_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Commune_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    District_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblCommu__7B61707E2B03E741", x => x.Commune_id);
                });

            migrationBuilder.CreateTable(
                name: "tblDistrict",
                columns: table => new
                {
                    District_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    District_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Province_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblDistr__51E2FC2A2E506A4F", x => x.District_id);
                });

            migrationBuilder.CreateTable(
                name: "tblOrder",
                columns: table => new
                {
                    Order_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Customer_id = table.Column<int>(type: "int", nullable: true),
                    Transport_type_id = table.Column<int>(type: "int", nullable: true),
                    Service_type_id = table.Column<int>(type: "int", nullable: true),
                    Weight_type_id = table.Column<int>(type: "int", nullable: true),
                    Order_status_id = table.Column<int>(type: "int", nullable: true),
                    Shipper_id = table.Column<int>(type: "int", nullable: true),
                    Manager_id = table.Column<int>(type: "int", nullable: true),
                    Order_from_commune_id = table.Column<int>(type: "int", nullable: true),
                    Order_from_district_id = table.Column<int>(type: "int", nullable: true),
                    Order_from_province_id = table.Column<int>(type: "int", nullable: true),
                    Order_to_commune_id = table.Column<int>(type: "int", nullable: true),
                    Order_to_district_id = table.Column<int>(type: "int", nullable: true),
                    Order_to_province_id = table.Column<int>(type: "int", nullable: true),
                    Recipient_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Recipient_phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price_value = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Create_date = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    Shipping_code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblOrder__F1FF8453BECF6B08", x => x.Order_id);
                });

            migrationBuilder.CreateTable(
                name: "tblOrderStatus",
                columns: table => new
                {
                    Order_status_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Order_status_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblOrder__92D894FD0C6AB51C", x => x.Order_status_id);
                });

            migrationBuilder.CreateTable(
                name: "tblPrice",
                columns: table => new
                {
                    Price_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Transport_type_id = table.Column<int>(type: "int", nullable: true),
                    Service_type_id = table.Column<int>(type: "int", nullable: true),
                    Weight_type_id = table.Column<int>(type: "int", nullable: true),
                    Price_value = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblPrice__A487179A96E2A92A", x => x.Price_id);
                });

            migrationBuilder.CreateTable(
                name: "tblProvince",
                columns: table => new
                {
                    Province_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Province_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblProvi__D444B23A21421CF1", x => x.Province_id);
                });

            migrationBuilder.CreateTable(
                name: "tblRole",
                columns: table => new
                {
                    Role_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Role_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblRole__D80BB093F152A4DF", x => x.Role_id);
                });

            migrationBuilder.CreateTable(
                name: "tblServiceType",
                columns: table => new
                {
                    Service_type_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Service_type_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblServi__FE1F00F3348C1CEC", x => x.Service_type_id);
                });

            migrationBuilder.CreateTable(
                name: "tblTransportType",
                columns: table => new
                {
                    Transport_type_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Transport_type_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblTrans__B5527FE027FFEB19", x => x.Transport_type_id);
                });
*/
            migrationBuilder.CreateTable(
                name: "tblVote",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShipperId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    Diem = table.Column<int>(type: "int", nullable: false),
                    DanhGia = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblVote", x => x.Id);
                });
/*
            migrationBuilder.CreateTable(
                name: "tblWeightType",
                columns: table => new
                {
                    Weight_type_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Weight_number = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblWeigh__4EAC34BB90316ADD", x => x.Weight_type_id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "NVARCHAR(50)", nullable: false),
                    LastName = table.Column<string>(type: "NVARCHAR(50)", nullable: false),
                    Email = table.Column<string>(type: "NVARCHAR(255)", nullable: false),
                    Sdt = table.Column<string>(type: "VARCHAR(10)", nullable: false),
                    Password = table.Column<string>(type: "NVARCHAR(50)", nullable: false),
                    Verify = table.Column<bool>(type: "BIT", nullable: false),
                    IdRole = table.Column<int>(type: "INT", nullable: false),
                    passwordChangeAt = table.Column<string>(type: "VARCHAR", nullable: true),
                    passwordResetToken = table.Column<string>(type: "VARCHAR", nullable: true),
                    Deleted = table.Column<bool>(type: "BIT", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    GioiTInh = table.Column<string>(type: "NVARCHAR(50)", nullable: true),
                    NgayThangNamSinh = table.Column<DateTime>(type: "DATETIME", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblUser",
                columns: table => new
                {
                    User_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Role_id = table.Column<int>(type: "int", nullable: true),
                    User_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Phone_number = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Full_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblUser__206A9DF83624D5BA", x => x.User_id);
                    table.ForeignKey(
                        name: "FK_tblUser_tblRole_Role_id",
                        column: x => x.Role_id,
                        principalTable: "tblRole",
                        principalColumn: "Role_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblUser_Role_id",
                table: "tblUser",
                column: "Role_id");*/
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaiHocs");

            migrationBuilder.DropTable(
                name: "ChiTietKhoaHocs");

            migrationBuilder.DropTable(
                name: "DangKys");

            migrationBuilder.DropTable(
                name: "EmailTemplate");

            migrationBuilder.DropTable(
                name: "GioHang");

            migrationBuilder.DropTable(
                name: "KhoaHocs");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "PermissionsRoles");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "tblCommune");

            migrationBuilder.DropTable(
                name: "tblDistrict");

            migrationBuilder.DropTable(
                name: "tblOrder");

            migrationBuilder.DropTable(
                name: "tblOrderStatus");

            migrationBuilder.DropTable(
                name: "tblPrice");

            migrationBuilder.DropTable(
                name: "tblProvince");

            migrationBuilder.DropTable(
                name: "tblServiceType");

            migrationBuilder.DropTable(
                name: "tblTransportType");

            migrationBuilder.DropTable(
                name: "tblUser");

            migrationBuilder.DropTable(
                name: "tblVote");

            migrationBuilder.DropTable(
                name: "tblWeightType");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "tblRole");
        }
    }
}
