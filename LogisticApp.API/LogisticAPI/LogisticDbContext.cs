using System;
using System.Collections.Generic;
using Logistic.Entities;
using LogisticAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace LogisticAPI;

public partial class LogisticDbContext : DbContext
{
    public LogisticDbContext()
    {
    }

    public LogisticDbContext(DbContextOptions<LogisticDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblCommune> TblCommunes { get; set; }

    public virtual DbSet<TblDistrict> TblDistricts { get; set; }

    public virtual DbSet<TblOrder> TblOrders { get; set; }

    public virtual DbSet<TblOrderStatus> TblOrderStatuses { get; set; }

    public virtual DbSet<TblPrice> TblPrices { get; set; }

    public virtual DbSet<TblProvince> TblProvinces { get; set; }

    public virtual DbSet<TblRole> TblRoles { get; set; }

    public virtual DbSet<TblServiceType> TblServiceTypes { get; set; }

    public virtual DbSet<TblTransportType> TblTransportTypes { get; set; }

    public virtual DbSet<TblUser> TblUsers { get; set; }

    public virtual DbSet<TblWeightType> TblWeightTypes { get; set; }

    public DbSet<BaiHoc> BaiHocs { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<PermissionsRole> PermissionsRoles { get; set; }
    public DbSet<Permissions> Permissions { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<KhoaHoc> KhoaHocs { get; set; }
    public DbSet<ChiTietKhoaHoc> ChiTietKhoaHocs { get; set; }
    public DbSet<DangKy> DangKies { get; set; }
    public DbSet<GioHang> GioHangs { get; set; }
    public DbSet<EmailTemplate> EmailTemplates { get; set; }
    public DbSet<TblVote> TblVotes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("SQL_Latin1_General_CP1_CI_AS");

        modelBuilder.Entity<TblCommune>(entity =>
        {
            entity.HasKey(e => e.CommuneId).HasName("PK__tblCommu__7B61707E2B03E741");

            entity.ToTable("tblCommune");

            entity.Property(e => e.CommuneId).HasColumnName("Commune_id");
            entity.Property(e => e.CommuneName)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("Commune_name");
            entity.Property(e => e.DistrictId).HasColumnName("District_id");
        });

        modelBuilder.Entity<TblDistrict>(entity =>
        {
            entity.HasKey(e => e.DistrictId).HasName("PK__tblDistr__51E2FC2A2E506A4F");

            entity.ToTable("tblDistrict");

            entity.Property(e => e.DistrictId).HasColumnName("District_id");
            entity.Property(e => e.DistrictName)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("District_name");
            entity.Property(e => e.ProvinceId).HasColumnName("Province_id");
        });

        modelBuilder.Entity<TblOrder>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__tblOrder__F1FF8453BECF6B08");

            entity.ToTable("tblOrder");

            entity.Property(e => e.OrderId).HasColumnName("Order_id");
            entity.Property(e => e.CreateDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("Create_date");
            entity.Property(e => e.CustomerId).HasColumnName("Customer_id");
            entity.Property(e => e.ManagerId).HasColumnName("Manager_id");
            entity.Property(e => e.OrderFromCommuneId).HasColumnName("Order_from_commune_id");
            entity.Property(e => e.OrderFromDistrictId).HasColumnName("Order_from_district_id");
            entity.Property(e => e.OrderFromProvinceId).HasColumnName("Order_from_province_id");
            entity.Property(e => e.OrderStatusId).HasColumnName("Order_status_id");
            entity.Property(e => e.OrderToCommuneId).HasColumnName("Order_to_commune_id");
            entity.Property(e => e.OrderToDistrictId).HasColumnName("Order_to_district_id");
            entity.Property(e => e.OrderToProvinceId).HasColumnName("Order_to_province_id");
            entity.Property(e => e.PriceValue)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("Price_value");
            entity.Property(e => e.RecipientName)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("Recipient_name");
            entity.Property(e => e.RecipientPhone)
                .IsRequired()
                .HasMaxLength(20)
                .HasColumnName("Recipient_phone");
            entity.Property(e => e.ServiceTypeId).HasColumnName("Service_type_id");
            entity.Property(e => e.ShipperId).HasColumnName("Shipper_id");
            entity.Property(e => e.ShippingCode)
                .HasMaxLength(50)
                .HasColumnName("Shipping_code");
            entity.Property(e => e.TransportTypeId).HasColumnName("Transport_type_id");
            entity.Property(e => e.WeightTypeId).HasColumnName("Weight_type_id");
        });

        modelBuilder.Entity<TblOrderStatus>(entity =>
        {
            entity.HasKey(e => e.OrderStatusId).HasName("PK__tblOrder__92D894FD0C6AB51C");

            entity.ToTable("tblOrderStatus");

            entity.Property(e => e.OrderStatusId).HasColumnName("Order_status_id");
            entity.Property(e => e.OrderStatusName)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("Order_status_name");
        });

        modelBuilder.Entity<TblPrice>(entity =>
        {
            entity.HasKey(e => e.PriceId).HasName("PK__tblPrice__A487179A96E2A92A");

            entity.ToTable("tblPrice");

            entity.Property(e => e.PriceId).HasColumnName("Price_id");
            entity.Property(e => e.PriceValue)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("Price_value");
            entity.Property(e => e.ServiceTypeId).HasColumnName("Service_type_id");
            entity.Property(e => e.TransportTypeId).HasColumnName("Transport_type_id");
            entity.Property(e => e.WeightTypeId).HasColumnName("Weight_type_id");

        });

        modelBuilder.Entity<TblProvince>(entity =>
        {
            entity.HasKey(e => e.ProvinceId).HasName("PK__tblProvi__D444B23A21421CF1");

            entity.ToTable("tblProvince");

            entity.Property(e => e.ProvinceId).HasColumnName("Province_id");
            entity.Property(e => e.ProvinceName)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("Province_name");
        });

        modelBuilder.Entity<TblRole>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__tblRole__D80BB093F152A4DF");

            entity.ToTable("tblRole");

            entity.Property(e => e.RoleId).HasColumnName("Role_id");
            entity.Property(e => e.RoleName)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("Role_name");
        });

        modelBuilder.Entity<TblServiceType>(entity =>
        {
            entity.HasKey(e => e.ServiceTypeId).HasName("PK__tblServi__FE1F00F3348C1CEC");

            entity.ToTable("tblServiceType");

            entity.Property(e => e.ServiceTypeId).HasColumnName("Service_type_id");
            entity.Property(e => e.ServiceTypeName)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("Service_type_name");
        });

        modelBuilder.Entity<TblTransportType>(entity =>
        {
            entity.HasKey(e => e.TransportTypeId).HasName("PK__tblTrans__B5527FE027FFEB19");

            entity.ToTable("tblTransportType");

            entity.Property(e => e.TransportTypeId).HasColumnName("Transport_type_id");
            entity.Property(e => e.TransportTypeName)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("Transport_type_name");
        });

        modelBuilder.Entity<TblUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__tblUser__206A9DF83624D5BA");

            entity.ToTable("tblUser");

            entity.Property(e => e.UserId).HasColumnName("User_id");
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.FullName)
                .HasMaxLength(100)
                .HasColumnName("Full_name");
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .HasColumnName("Phone_number");
            entity.Property(e => e.RoleId).HasColumnName("Role_id");
            entity.Property(e => e.UserName)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("User_name");
        });

        modelBuilder.Entity<TblWeightType>(entity =>
        {
            entity.HasKey(e => e.WeightTypeId).HasName("PK__tblWeigh__4EAC34BB90316ADD");

            entity.ToTable("tblWeightType");

            entity.Property(e => e.WeightTypeId).HasColumnName("Weight_type_id");
            entity.Property(e => e.WeightNumber)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("Weight_number");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
