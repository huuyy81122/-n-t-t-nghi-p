using System;
using System.Collections.Generic;

namespace LogisticAPI.Entities;

public partial class TblOrder
{
    public int OrderId { get; set; }

    public int? CustomerId { get; set; }

    public int? TransportTypeId { get; set; }

    public int? ServiceTypeId { get; set; }

    public int? WeightTypeId { get; set; }

    public int? OrderStatusId { get; set; }

    public int? ShipperId { get; set; }

    public int? ManagerId { get; set; }

    public int? OrderFromCommuneId { get; set; }

    public int? OrderFromDistrictId { get; set; }

    public int? OrderFromProvinceId { get; set; }

    public int? OrderToCommuneId { get; set; }

    public int? OrderToDistrictId { get; set; }

    public int? OrderToProvinceId { get; set; }

    public string RecipientName { get; set; }

    public string RecipientPhone { get; set; }

    public string Note { get; set; }

    public decimal? PriceValue { get; set; }

    public DateTime? CreateDate { get; set; }

    public string ShippingCode { get; set; }
    public float? Latitude { get; set; }
    public float? Longitude { get; set; }
}
