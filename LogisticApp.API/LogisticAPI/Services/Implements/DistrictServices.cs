using AutoMapper;
using LogisticAPI.Entities;
using LogisticAPI;

public class DistrictServices : IDistrictServices
{
    private readonly LogisticDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContext;

    public DistrictServices(LogisticDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _mapper = mapper;
        _httpContext = httpContext;
    }

    // Hàm thêm cho TblDistrict
    public void CreateDistrict(CreateDistrictDto input)
    {
        if (_dbContext.TblDistricts.Any(d => d.DistrictName == input.DistrictName))
        {
            throw new Exception($"Huyện \"{input.DistrictName}\" đã tồn tại");
        }

        _dbContext.TblDistricts.Add(new TblDistrict
        {
            DistrictName = input.DistrictName,
            ProvinceId = input.ProvinceId
        });

        _dbContext.SaveChanges();
    }

    // Hàm sửa cho TblDistrict
    public void UpdateDistrict(UpdateDistrictDto input)
    {
        var district = _dbContext.TblDistricts.FirstOrDefault(d => d.DistrictId == input.DistrictId);
        if (district == null)
        {
            throw new Exception($"Không tìm thấy huyện với ID \"{input.DistrictId}\"");
        }

        district.DistrictName = input.DistrictName;
        district.ProvinceId = input.ProvinceId;

        _dbContext.SaveChanges();
    }

    // Hàm xóa cho TblDistrict
    public void DeleteDistrict(int districtId)
    {
        var district = _dbContext.TblDistricts.FirstOrDefault(d => d.DistrictId == districtId);
        if (district == null)
        {
            throw new Exception($"Không tìm thấy huyện với ID \"{districtId}\"");
        }

        _dbContext.TblDistricts.Remove(district);
        _dbContext.SaveChanges();
    }

    // Hàm lấy toàn bộ dữ liệu
    public List<TblDistrict> GetAllDistricts()
    {
        return _dbContext.TblDistricts.ToList();
    }

    // Hàm lấy chi tiết dữ liệu
    public TblDistrict GetDistrictById(int districtId)
    {
        var district = _dbContext.TblDistricts.FirstOrDefault(d => d.DistrictId == districtId);
        if (district == null)
        {
            throw new Exception($"Không tìm thấy huyện với ID \"{districtId}\"");
        }

        return district;
    }
}

// DTOs cho TblDistrict
public class CreateDistrictDto
{
    public string DistrictName { get; set; }
    public int? ProvinceId { get; set; }
}

public class UpdateDistrictDto
{
    public int DistrictId { get; set; }
    public string DistrictName { get; set; }
    public int? ProvinceId { get; set; }
}

// Interface cho DistrictServices
public interface IDistrictServices
{
    void CreateDistrict(CreateDistrictDto input);
    void UpdateDistrict(UpdateDistrictDto input);
    void DeleteDistrict(int districtId);
    List<TblDistrict> GetAllDistricts();
    TblDistrict GetDistrictById(int districtId);
}
