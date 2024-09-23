using AutoMapper;
using LogisticAPI.Entities;
using LogisticAPI;
using Logistic.Common;
using Logistic.Constants;

public class PriceServices : IPriceServices
{
    private readonly LogisticDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContext;

    public PriceServices(LogisticDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _mapper = mapper;
        _httpContext = httpContext;
    }

    // Hàm thêm cho TblPrice
    public void CreatePrice(CreatePriceDto input)
    {
        _dbContext.TblPrices.Add(new TblPrice
        {
            TransportTypeId = input.TransportTypeId,
            ServiceTypeId = input.ServiceTypeId,
            WeightTypeId = input.WeightTypeId,
            PriceValue = input.PriceValue
        });

        _dbContext.SaveChanges();
    }

    // Hàm sửa cho TblPrice
    public void UpdatePrice(UpdatePriceDto input)
    {
        var price = _dbContext.TblPrices.FirstOrDefault(p => p.PriceId == input.PriceId);
        if (price == null)
        {
            throw new Exception($"Không tìm thấy giá với ID \"{input.PriceId}\"");
        }

        price.TransportTypeId = input.TransportTypeId;
        price.ServiceTypeId = input.ServiceTypeId;
        price.WeightTypeId = input.WeightTypeId;
        price.PriceValue = input.PriceValue;

        _dbContext.SaveChanges();
    }

    // Hàm xóa cho TblPrice
    public void DeletePrice(int priceId)
    {
        var price = _dbContext.TblPrices.FirstOrDefault(p => p.PriceId == priceId);
        if (price == null)
        {
            throw new Exception($"Không tìm thấy giá với ID \"{priceId}\"");
        }

        _dbContext.TblPrices.Remove(price);
        _dbContext.SaveChanges();
    }

    // Hàm lấy toàn bộ dữ liệu
    public List<PriceDto> GetAllPrices()
    {
        var query = (from dt in _dbContext.TblPrices
                    from w in _dbContext.TblWeightTypes.Where(x => x.WeightTypeId == dt.WeightTypeId).DefaultIfEmpty()
                    from s in _dbContext.TblServiceTypes.Where(x => x.ServiceTypeId == dt.ServiceTypeId).DefaultIfEmpty()
                    from t in _dbContext.TblTransportTypes.Where(x => x.TransportTypeId == dt.TransportTypeId).DefaultIfEmpty()
                    select new PriceDto()
                    {
                        TransportTypeId = dt.TransportTypeId,
                        PriceId = dt.PriceId,   
                        WeightTypeId = dt.WeightTypeId,
                        PriceValue = dt.PriceValue, 
                        ServiceTypeId = dt.ServiceTypeId,   
                        ServiceTypeName = s.ServiceTypeName,
                        TransportTypeName = t.TransportTypeName,
                        WeightNumber = w.WeightNumber
                    }).ToList();
        return query;
    }

    // Hàm lấy chi tiết dữ liệu
    public TblPrice GetPriceById(int priceId)
    {
        var price = _dbContext.TblPrices.FirstOrDefault(p => p.PriceId == priceId);
        if (price == null)
        {
            throw new Exception($"Không tìm thấy giá với ID \"{priceId}\"");
        }

        return price;
    }

    // Hàm lấy chi tiết dữ liệu
    public ResponseModelBase<TblPrice> GetDetail(TblPrice model)
    {
        var price = _dbContext.TblPrices.FirstOrDefault(p => p.TransportTypeId == model.TransportTypeId && p.ServiceTypeId == model.ServiceTypeId && p.WeightTypeId == model.WeightTypeId);
        if (price == null)
        {
            return new ResponseModelBase<TblPrice>
            {
                Data = price,
                StatusCode = StatusCodeApp.BadRequest,
                Message = "Giá chưa được định nghĩa"
            };
        }

        return new ResponseModelBase<TblPrice>
        {
            Data = price,
            StatusCode = StatusCodeApp.Success,
            Message = "Thành công"
        };
    }
}

// DTOs cho TblPrice
public class CreatePriceDto
{
    public int? TransportTypeId { get; set; }
    public int? ServiceTypeId { get; set; }
    public int? WeightTypeId { get; set; }
    public decimal PriceValue { get; set; }
}
public class PriceDto : TblPrice
{
    public string TransportTypeName { get; set; }
    public string ServiceTypeName { get; set; }
    public decimal WeightNumber { get; set; }
}
public class UpdatePriceDto
{
    public int PriceId { get; set; }
    public int? TransportTypeId { get; set; }
    public int? ServiceTypeId { get; set; }
    public int? WeightTypeId { get; set; }
    public decimal PriceValue { get; set; }
}

// Interface cho PriceServices
public interface IPriceServices
{
    void CreatePrice(CreatePriceDto input);
    void UpdatePrice(UpdatePriceDto input);
    void DeletePrice(int priceId);
    List<PriceDto> GetAllPrices();
    TblPrice GetPriceById(int priceId);
    ResponseModelBase<TblPrice> GetDetail(TblPrice model);
}
