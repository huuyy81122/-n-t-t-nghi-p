using AutoMapper;
using LogisticAPI.Entities;
using LogisticAPI;

public class ProvinceServices : IProvinceServices
{
    private readonly LogisticDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContext;

    public ProvinceServices(LogisticDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _mapper = mapper;
        _httpContext = httpContext;
    }

    // Hàm thêm cho TblProvince
    public void CreateProvince(CreateProvinceDto input)
    {
        if (_dbContext.TblProvinces.Any(p => p.ProvinceName == input.ProvinceName))
        {
            throw new Exception($"Tỉnh \"{input.ProvinceName}\" đã tồn tại");
        }

        _dbContext.TblProvinces.Add(new TblProvince
        {
            ProvinceName = input.ProvinceName
        });

        _dbContext.SaveChanges();
    }

    // Hàm sửa cho TblProvince
    public void UpdateProvince(UpdateProvinceDto input)
    {
        var province = _dbContext.TblProvinces.FirstOrDefault(p => p.ProvinceId == input.ProvinceId);
        if (province == null)
        {
            throw new Exception($"Không tìm thấy tỉnh với ID \"{input.ProvinceId}\"");
        }

        province.ProvinceName = input.ProvinceName;

        _dbContext.SaveChanges();
    }

    // Hàm xóa cho TblProvince
    public void DeleteProvince(int provinceId)
    {
        var province = _dbContext.TblProvinces.FirstOrDefault(p => p.ProvinceId == provinceId);
        if (province == null)
        {
            throw new Exception($"Không tìm thấy tỉnh với ID \"{provinceId}\"");
        }

        _dbContext.TblProvinces.Remove(province);
        _dbContext.SaveChanges();
    }

    // Hàm lấy toàn bộ dữ liệu
    public List<TblProvince> GetAllProvinces()
    {
        return _dbContext.TblProvinces.ToList();
    }

    // Hàm lấy chi tiết dữ liệu
    public TblProvince GetProvinceById(int provinceId)
    {
        var province = _dbContext.TblProvinces.FirstOrDefault(p => p.ProvinceId == provinceId);
        if (province == null)
        {
            throw new Exception($"Không tìm thấy tỉnh với ID \"{provinceId}\"");
        }

        return province;
    }
}

// DTOs cho TblProvince
public class CreateProvinceDto
{
    public string ProvinceName { get; set; }
}

public class UpdateProvinceDto
{
    public int ProvinceId { get; set; }
    public string ProvinceName { get; set; }
}

// Interface cho ProvinceServices
public interface IProvinceServices
{
    void CreateProvince(CreateProvinceDto input);
    void UpdateProvince(UpdateProvinceDto input);
    void DeleteProvince(int provinceId);
    List<TblProvince> GetAllProvinces();
    TblProvince GetProvinceById(int provinceId);
}
