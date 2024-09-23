using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Logistic.Entities
{
    [Table("PermissionsRoles")]
    public class PermissionsRole
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "INT")]
        public int IdRole { get; set; }

        [Required]
        [Column(TypeName = "INT")]
        public int IdPermissions { get; set; }

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
        public string CreateBy { get; set; }
    }
}
