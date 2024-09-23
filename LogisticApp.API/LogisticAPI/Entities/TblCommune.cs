using System;
using System.Collections.Generic;

namespace LogisticAPI.Entities;

public partial class TblCommune
{
    public int CommuneId { get; set; }

    public string CommuneName { get; set; }

    public int? DistrictId { get; set; }
}
