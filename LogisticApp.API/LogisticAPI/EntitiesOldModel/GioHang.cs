using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Logistic.Entities
{
    [Table("GioHang")]
    public class GioHang
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "INT")]
        public int IdUser { get; set; }

        [Required]
        [Column(TypeName = "INT")]
        public int IdKhoaHoc { get; set; }

        [Column(TypeName = "BIT")]
        public bool Deleted { get; set; }

        [Column(TypeName = "DATETIME")]
        public DateTime CreateAt { get; set; }

        [Column(TypeName = "DATETIME")]
        public DateTime? UpdateAt { get; set; }

        [Required]
        [Column(TypeName = "NVARCHAR(50)")]
        public string CreateBy { get; set; }
    }
}
