using Logistic.Constants;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Logistic.Entities
{
    [Table("KhoaHocs")]
    public class KhoaHoc
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "NVARCHAR(MAX)")]
        public string TenKhoaHoc { get; set; }

        [Column(TypeName = "NVARCHAR(MAX)")]
        public string Thumnail { get; set; }

        [Required]
        [Column(TypeName = "DECIMAL(10,2)")]
        public Decimal GiaGoc { get; set; }

        [Required]
        [Column(TypeName = "DECIMAL(10,2)")]
        public Decimal GiaGiam { get; set; }

        public int LuotBan { get; set; }

        [EnumDataType(typeof(LuotDanhGiaConstaint))]
        public int DiemDanhGia { get; set; }

        [Column(TypeName = "NVARCHAR(MAX)")]
        public string NoiDung { get; set; } = string.Empty;

        [Column(TypeName = "NVARCHAR(MAX)")]
        public string GioiThieu { get; set; } = string.Empty;

        [Column(TypeName = "VARCHAR(MAX)")]
        public string TheLoai { get; set; }

        [Column(TypeName = "BIT")]
        public bool Deleted { get; set; }

        [Column(TypeName = "DATETIME")]
        public DateTime? CreateAt { get; set; }

        
        [Column(TypeName = "DATETIME")]
        public DateTime? UpdateAt { get; set; }

        [Required]
        [Column(TypeName = "NVARCHAR(MAX)")]
        public string CreateBy { get; set; }

        [Column(TypeName = "BIT")]
        public bool YeuThich { get; set; }

    }
}
