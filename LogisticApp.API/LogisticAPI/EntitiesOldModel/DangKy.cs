using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Logistic.Entities
{
    [Table("DangKys")]
    public class DangKy
    {
        /*userid: DataTypes.INTEGER,
    khoahocid: DataTypes.INTEGER,
    hinhthucthanhtoan: DataTypes.STRING,
    hoten: DataTypes.STRING,
    email: DataTypes.STRING,
    sdt: DataTypes.STRING,
    ghichu: DataTypes.STRING,
    xacnhan: DataTypes.INTEGER,
    deleted: DataTypes.INTEGER*/
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

        [Required]
        [Column(TypeName = "DATETIME")]
        public DateTime CreateAt { get; set; }

        [Required]
        [Column(TypeName = "DATETIME")]
        public DateTime UpdateAt { get; set; }

        [Required]
        [Column(TypeName = "NVARCHAR(50)")]
        public string CreateBy { get; set; }
    }
}
