using AutoMapper;
using LogisticAPI.Entities;
using LogisticAPI;

public class TransportTypeServices : ITransportTypeServices
{
    private readonly LogisticDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContext;

    public TransportTypeServices(LogisticDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _mapper = mapper;
        _httpContext = httpContext;
    }

    // Hàm thêm cho TblTransportType
    public void CreateTransportType(CreateTransportTypeDto input)
    {
        if (_dbContext.TblTransportTypes.Any(tt => tt.TransportTypeName == input.TransportTypeName))
        {
            throw new Exception($"Loại phương tiện \"{input.TransportTypeName}\" đã tồn tại");
        }

        _dbContext.TblTransportTypes.Add(new TblTransportType
        {
            TransportTypeName = input.TransportTypeName
        });

        _dbContext.SaveChanges();
    }

    // Hàm sửa cho TblTransportType
    public void UpdateTransportType(UpdateTransportTypeDto input)
    {
        var transportType = _dbContext.TblTransportTypes.FirstOrDefault(tt => tt.TransportTypeId == input.TransportTypeId);
        if (transportType == null)
        {
            throw new Exception($"Không tìm thấy loại phương tiện với ID \"{input.TransportTypeId}\"");
        }

        transportType.TransportTypeName = input.TransportTypeName;

        _dbContext.SaveChanges();
    }

    // Hàm xóa cho TblTransportType
    public void DeleteTransportType(int transportTypeId)
    {
        var transportType = _dbContext.TblTransportTypes.FirstOrDefault(tt => tt.TransportTypeId == transportTypeId);
        if (transportType == null)
        {
            throw new Exception($"Không tìm thấy loại phương tiện với ID \"{transportTypeId}\"");
        }

        _dbContext.TblTransportTypes.Remove(transportType);
        _dbContext.SaveChanges();
    }

    // Hàm lấy toàn bộ dữ liệu
    public List<TblTransportType> GetAllTransportTypes()
    {
        return _dbContext.TblTransportTypes.ToList();
    }

    // Hàm lấy chi tiết dữ liệu
    public TblTransportType GetTransportTypeById(int transportTypeId)
    {
        var transportType = _dbContext.TblTransportTypes.FirstOrDefault(tt => tt.TransportTypeId == transportTypeId);
        if (transportType == null)
        {
            throw new Exception($"Không tìm thấy loại phương tiện với ID \"{transportTypeId}\"");
        }

        return transportType;
    }
}

// DTOs cho TblTransportType
public class CreateTransportTypeDto
{
    public string TransportTypeName { get; set; }
}

public class UpdateTransportTypeDto
{
    public int TransportTypeId { get; set; }
    public string TransportTypeName { get; set; }
}

// Interface cho TransportTypeServices
public interface ITransportTypeServices
{
    void CreateTransportType(CreateTransportTypeDto input);
    void UpdateTransportType(UpdateTransportTypeDto input);
    void DeleteTransportType(int transportTypeId);
    List<TblTransportType> GetAllTransportTypes();
    TblTransportType GetTransportTypeById(int transportTypeId);
}
