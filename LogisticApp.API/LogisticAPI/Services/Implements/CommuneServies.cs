using AutoMapper;
using LogisticAPI.Entities;
using LogisticAPI;

public class CommuneServices : ICommuneServices
{
    private readonly LogisticDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContext;

    public CommuneServices(LogisticDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _mapper = mapper;
        _httpContext = httpContext;
    }

    // Hàm thêm cho TblCommune
    public void CreateCommune(CreateCommuneDto input)
    {
        if (_dbContext.TblCommunes.Any(c => c.CommuneName == input.CommuneName))
        {
            throw new Exception($"Xã \"{input.CommuneName}\" đã tồn tại");
        }

        _dbContext.TblCommunes.Add(new TblCommune
        {
            CommuneName = input.CommuneName,
            DistrictId = input.DistrictId
        });

        _dbContext.SaveChanges();
    }

    // Hàm sửa cho TblCommune
    public void UpdateCommune(UpdateCommuneDto input)
    {
        var commune = _dbContext.TblCommunes.FirstOrDefault(c => c.CommuneId == input.CommuneId);
        if (commune == null)
        {
            throw new Exception($"Không tìm thấy xã với ID \"{input.CommuneId}\"");
        }

        commune.CommuneName = input.CommuneName;
        commune.DistrictId = input.DistrictId;

        _dbContext.SaveChanges();
    }

    // Hàm xóa cho TblCommune
    public void DeleteCommune(int communeId)
    {
        var commune = _dbContext.TblCommunes.FirstOrDefault(c => c.CommuneId == communeId);
        if (commune == null)
        {
            throw new Exception($"Không tìm thấy xã với ID \"{communeId}\"");
        }

        _dbContext.TblCommunes.Remove(commune);
        _dbContext.SaveChanges();
    }

    // Hàm lấy toàn bộ dữ liệu
    public List<TblCommune> GetAllCommunes()
    {
        return _dbContext.TblCommunes.ToList();
    }

    // Hàm lấy chi tiết dữ liệu
    public TblCommune GetCommuneById(int communeId)
    {
        var commune = _dbContext.TblCommunes.FirstOrDefault(c => c.CommuneId == communeId);
        if (commune == null)
        {
            throw new Exception($"Không tìm thấy xã với ID \"{communeId}\"");
        }

        return commune;
    }
}

// DTOs cho TblCommune
public class CreateCommuneDto
{
    public string CommuneName { get; set; }
    public int? DistrictId { get; set; }
}

public class UpdateCommuneDto
{
    public int CommuneId { get; set; }
    public string CommuneName { get; set; }
    public int? DistrictId { get; set; }
}

// Interface cho CommuneServices
public interface ICommuneServices
{
    void CreateCommune(CreateCommuneDto input);
    void UpdateCommune(UpdateCommuneDto input);
    void DeleteCommune(int communeId);
    List<TblCommune> GetAllCommunes();
    TblCommune GetCommuneById(int communeId);
}
