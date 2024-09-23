using AutoMapper;
using LogisticAPI.Entities;
using LogisticAPI;

public class ServiceTypeServices : IServiceTypeServices
{
    private readonly LogisticDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContext;

    public ServiceTypeServices(LogisticDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _mapper = mapper;
        _httpContext = httpContext;
    }

    // Hàm thêm cho TblServiceType
    public void CreateServiceType(CreateServiceTypeDto input)
    {
        if (_dbContext.TblServiceTypes.Any(st => st.ServiceTypeName == input.ServiceTypeName))
        {
            throw new Exception($"Loại dịch vụ \"{input.ServiceTypeName}\" đã tồn tại");
        }

        _dbContext.TblServiceTypes.Add(new TblServiceType
        {
            ServiceTypeName = input.ServiceTypeName
        });

        _dbContext.SaveChanges();
    }

    // Hàm sửa cho TblServiceType
    public void UpdateServiceType(UpdateServiceTypeDto input)
    {
        var serviceType = _dbContext.TblServiceTypes.FirstOrDefault(st => st.ServiceTypeId == input.ServiceTypeId);
        if (serviceType == null)
        {
            throw new Exception($"Không tìm thấy loại dịch vụ với ID \"{input.ServiceTypeId}\"");
        }

        serviceType.ServiceTypeName = input.ServiceTypeName;

        _dbContext.SaveChanges();
    }

    // Hàm xóa cho TblServiceType
    public void DeleteServiceType(int serviceTypeId)
    {
        var serviceType = _dbContext.TblServiceTypes.FirstOrDefault(st => st.ServiceTypeId == serviceTypeId);
        if (serviceType == null)
        {
            throw new Exception($"Không tìm thấy loại dịch vụ với ID \"{serviceTypeId}\"");
        }

        _dbContext.TblServiceTypes.Remove(serviceType);
        _dbContext.SaveChanges();
    }

    // Hàm lấy toàn bộ dữ liệu
    public List<TblServiceType> GetAllServiceTypes()
    {
        return _dbContext.TblServiceTypes.ToList();
    }

    // Hàm lấy chi tiết dữ liệu
    public TblServiceType GetServiceTypeById(int serviceTypeId)
    {
        var serviceType = _dbContext.TblServiceTypes.FirstOrDefault(st => st.ServiceTypeId == serviceTypeId);
        if (serviceType == null)
        {
            throw new Exception($"Không tìm thấy loại dịch vụ với ID \"{serviceTypeId}\"");
        }

        return serviceType;
    }
}

// DTOs cho TblServiceType
public class CreateServiceTypeDto
{
    public string ServiceTypeName { get; set; }
}

public class UpdateServiceTypeDto
{
    public int ServiceTypeId { get; set; }
    public string ServiceTypeName { get; set; }
}

// Interface cho ServiceTypeServices
public interface IServiceTypeServices
{
    void CreateServiceType(CreateServiceTypeDto input);
    void UpdateServiceType(UpdateServiceTypeDto input);
    void DeleteServiceType(int serviceTypeId);
    List<TblServiceType> GetAllServiceTypes();
    TblServiceType GetServiceTypeById(int serviceTypeId);
}
