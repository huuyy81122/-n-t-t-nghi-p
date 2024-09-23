using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Logistic.Entities
{
    [Table("ChiTietKhoaHocs")]
    public class ChiTietKhoaHoc
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
        public int IdBaiHoc { get; set; }

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
    }
}
