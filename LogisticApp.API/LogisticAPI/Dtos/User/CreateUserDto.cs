using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Logistic.Dtos.User
{
    public class CreateUserDto
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(255)]
        public string Email { get; set; }
        [Required]
        [MaxLength(10)]
        public string Sdt { get; set; }
        [Required]
        public string Password { get; set; }
        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
        public int IdRole { get; set; } = 0;
    }
}
