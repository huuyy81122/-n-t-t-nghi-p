using System;
using System.Collections.Generic;

namespace LogisticAPI.Entities;

public partial class TblUser
{
    public int UserId { get; set; }

    public int? RoleId { get; set; }

    public string UserName { get; set; }

    public string Password { get; set; }

    public string PhoneNumber { get; set; }

    public string FullName { get; set; }

    public string Email { get; set; }

    public string Image { get; set; }
    public float? Latitude { get; set; }
    public float? Longitude { get; set; }
}
