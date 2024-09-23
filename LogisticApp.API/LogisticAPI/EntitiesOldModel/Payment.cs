using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Logistic.Entities
{
    [Table("Payments")]
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "INT")]
        public int IdKhoaHoc { get; set; }

        [Required]
        [Column(TypeName = "INT")]
        public int IdUser { get; set; }

        [Required]
        [Column(TypeName = "NVARCHAR")]
        [MaxLength(255)]
        public string HoTen { get; set; }

        [Required]
        [Column(TypeName = "NVARCHAR")]
        [MaxLength(255)]
        public string TenKhoaHoc { get; set; }

        [Required]
        [Column(TypeName = "DECIMAL(10,2)")]
        public Decimal Gia { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR")]
        [MaxLength(255)]
        public string NoiDung { get; set; }

        [Required]
        [Column(TypeName = "NVARCHAR")]
        [MaxLength(255)]
        public string AnhChuyenKhoan { get; set; }

        [Column(TypeName = "BIT")]
        public bool Deleted { get; set; }

        [Required]
        [Column(TypeName = "DATETIME")]
        public DateTime CreateAt { get; set; }

        [Required]
        [Column(TypeName = "DATETIME")]
        public DateTime UpdateAt { get; set; }

        [Required]
        [Column(TypeName = "NVARCHAR")]
        [MaxLength(255)]
        public string CreateBy { get; set; }

        [Column(TypeName = "BIT")]
        public bool TrangThai { get; set; }
    }
}
