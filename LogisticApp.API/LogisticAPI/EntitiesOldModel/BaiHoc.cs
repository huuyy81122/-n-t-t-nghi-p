using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Logistic.Entities
{
    [Table("BaiHocs")]
    public class BaiHoc
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }

        [Column(TypeName = "NVARCHAR(120)")]
        public string TenBaiHoc { get; set; }

        [Column(TypeName = "NVARCHAR(120)")]
        public string NoiDung { get; set; }

        [Column(TypeName = "NVARCHAR(120)")]
        public string MoTa { get; set; }

        [Column(TypeName = "BIT")]
        public bool Deleted { get; set; }

        [Required]
        [Column(TypeName = "DATETIME")]
        public DateTime CreateAt { get; set; }

        [Required]
        [Column(TypeName = "DATETIME")]
        public DateTime UpdateAt { get; set; }

        [Required]
        [Column(TypeName = "NVARCHAR(120)")]
        public string CreateBy { get; set; }
    }
}
