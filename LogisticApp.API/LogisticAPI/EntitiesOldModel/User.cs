using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Logistic.Entities
{
    [Table("Users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "NVARCHAR(50)")]
        public string FirstName { get; set; }
        [Required]
        [Column(TypeName = "NVARCHAR(50)")] 
        public string LastName { get; set; }
        [Required]
        [Column(TypeName = "NVARCHAR(255)")]
        public string Email { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR(10)")]
        public string Sdt { get; set; }
        [Required]
        [Column(TypeName = "NVARCHAR(50)")]
        public string Password { get; set; }
        [Required]
        [Column(TypeName = "BIT")]
        public bool Verify { get; set; } = false;
        [Required]
        [Column(TypeName = "INT")]
        public int IdRole { get; set; }

        [Column(TypeName = "VARCHAR")]
        public string passwordChangeAt { get; set; }

        [Column(TypeName = "VARCHAR")]
        public string passwordResetToken { get; set; }

        [Column(TypeName = "BIT")]
        public bool Deleted { get; set; }

        [Required]
        [Column(TypeName = "DATETIME")]
        public DateTime CreateAt { get; set; }

        [Required]
        [Column(TypeName = "DATETIME")]

        public DateTime UpdateAt { get; set; }

        [Column(TypeName = "NVARCHAR(50)")]
        public string? GioiTInh { get; set; }
        [Column(TypeName = "DATETIME")]
        public DateTime? NgayThangNamSinh { get; set; }

        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
    }
}
