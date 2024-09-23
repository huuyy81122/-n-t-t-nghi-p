namespace Logistic.Dtos.User
{
    public class UpdateUserDto
    {
        public int Id { get; set; }
        public int IdRole { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Sdt { get; set; }
        public string GioiTInh { get; set; }
        public string Password { get; set; }
        public bool UpdatePassword { get; set; } = false;
        public DateTime? NgayThangNamSinh { get; set; }
        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
        public bool TrangThaiNhanHang { get; set; }
    }
}
