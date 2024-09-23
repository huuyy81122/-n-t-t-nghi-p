namespace LogisticAPI.Entities;

public partial class TblDistrict
{
    public int DistrictId { get; set; }

    public string DistrictName { get; set; }

    public int? ProvinceId { get; set; }
}
