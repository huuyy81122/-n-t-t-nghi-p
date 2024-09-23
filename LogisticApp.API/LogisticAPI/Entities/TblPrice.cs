using System;
using System.Collections.Generic;

namespace LogisticAPI.Entities;

public partial class TblPrice
{
    public int PriceId { get; set; }

    public int? TransportTypeId { get; set; }

    public int? ServiceTypeId { get; set; }

    public int? WeightTypeId { get; set; }

    public decimal PriceValue { get; set; }
}
