using AutoMapper;
using LogisticAPI.Entities;
using LogisticAPI;

public class WeightTypeServices : IWeightTypeServices
{
    private readonly LogisticDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContext;

    public WeightTypeServices(LogisticDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _mapper = mapper;
        _httpContext = httpContext;
    }

    // Hàm thêm cho TblWeightType
    public void CreateWeightType(CreateWeightTypeDto input)
    {
        if (_dbContext.TblWeightTypes.Any(wt => wt.WeightNumber == input.WeightNumber))
        {
            throw new Exception($"Loại trọng lượng \"{input.WeightNumber}\" đã tồn tại");
        }

        _dbContext.TblWeightTypes.Add(new TblWeightType
        {
            WeightNumber = input.WeightNumber
        });

        _dbContext.SaveChanges();
    }

    // Hàm sửa cho TblWeightType
    public void UpdateWeightType(UpdateWeightTypeDto input)
    {
        var weightType = _dbContext.TblWeightTypes.FirstOrDefault(wt => wt.WeightTypeId == input.WeightTypeId);
        if (weightType == null)
        {
            throw new Exception($"Không tìm thấy loại trọng lượng với ID \"{input.WeightTypeId}\"");
        }

        weightType.WeightNumber = input.WeightNumber;

        _dbContext.SaveChanges();
    }

    // Hàm xóa cho TblWeightType
    public void DeleteWeightType(int weightTypeId)
    {
        var weightType = _dbContext.TblWeightTypes.FirstOrDefault(wt => wt.WeightTypeId == weightTypeId);
        if (weightType == null)
        {
            throw new Exception($"Không tìm thấy loại trọng lượng với ID \"{weightTypeId}\"");
        }

        _dbContext.TblWeightTypes.Remove(weightType);
        _dbContext.SaveChanges();
    }

    // Hàm lấy toàn bộ dữ liệu
    public List<WeightDto> GetAllWeightTypes()
    {
        var list = new List<WeightDto>();
        var weight = _dbContext.TblWeightTypes.ToList();

        for (int i = 0; i < weight.Count; i++)
        {
            list.Add(new WeightDto()
            {
                WeightTypeId = weight[i].WeightTypeId,
                WeightNumber = weight[i].WeightNumber,
                WeightName = i == 0 ? "Dưới " + weight[i].WeightNumber.ToString() + " kg": weight[i-1].WeightNumber.ToString() + " - " + weight[i].WeightNumber.ToString() + " kg",
            });
        }
        return list;
    }

    // Hàm lấy chi tiết dữ liệu
    public TblWeightType GetWeightTypeById(int weightTypeId)
    {
        var weightType = _dbContext.TblWeightTypes.FirstOrDefault(wt => wt.WeightTypeId == weightTypeId);
        if (weightType == null)
        {
            throw new Exception($"Không tìm thấy loại trọng lượng với ID \"{weightTypeId}\"");
        }

        return weightType;
    }
}

// DTOs cho TblWeightType
public class CreateWeightTypeDto
{
    public decimal WeightNumber { get; set; }
}

public class UpdateWeightTypeDto
{
    public int WeightTypeId { get; set; }
    public decimal WeightNumber { get; set; }
}
public class WeightDto
{
    public int WeightTypeId { get; set; }
    public decimal WeightNumber { get; set; }
    public string WeightName { get; set; }
}

// Interface cho WeightTypeServices
public interface IWeightTypeServices
{
    void CreateWeightType(CreateWeightTypeDto input);
    void UpdateWeightType(UpdateWeightTypeDto input);
    void DeleteWeightType(int weightTypeId);
    List<WeightDto> GetAllWeightTypes();
    TblWeightType GetWeightTypeById(int weightTypeId);
}
