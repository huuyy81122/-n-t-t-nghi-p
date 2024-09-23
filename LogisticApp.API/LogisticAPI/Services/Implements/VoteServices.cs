using AutoMapper;
using LogisticAPI.Entities;
using LogisticAPI;
using Logistic.Common;
using Logistic.Constants;

public class VoteServices : IVoteServices
{
    private readonly LogisticDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContext;

    public VoteServices(LogisticDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _mapper = mapper;
        _httpContext = httpContext;
    }

    // Hàm thêm cho TblVote
    public ResponseModelBase<string> CreateVote(CreateVoteDto input)
    {
        if(_dbContext.TblVotes.Any(x => x.ClientId == input.ClientId && x.OrderId == input.OrderId))
        {
            return new ResponseModelBase<string>
            {
                Message = "Bạn đã đánh giá cho đơn hàng này",
                StatusCode = StatusCodeApp.InternalServer
            };
        }
        _dbContext.TblVotes.Add(new TblVote
        {
            ClientId = input.ClientId,
            DanhGia = input.DanhGia,
            Diem = input.Diem,
            OrderId = input.OrderId,
            ShipperId = input.ShipperId,
        });

        _dbContext.SaveChanges();

        return new ResponseModelBase<string>
        {
            Message = "Thành công",
            StatusCode = StatusCodeApp.Success
        };
    }

    public List<VoteDto> GetAllVotes()
    {
        var result = (from dt in _dbContext.TblVotes
                      join s in _dbContext.Users on dt.ShipperId equals s.Id
                      join kh in _dbContext.Users on dt.ClientId equals kh.Id
                      join o in _dbContext.TblOrders on dt.OrderId equals o.OrderId
                      select new VoteDto
                      {
                          ClientId = dt.ClientId,
                          ClientName = kh.FirstName + " " +kh.LastName,
                          DanhGia = dt.DanhGia,
                          Diem = dt.Diem,
                          Id = dt.Id,
                          OrderId= dt.OrderId,
                          ShipperId= dt.ShipperId,
                          ShipperName = s.FirstName + " " + s.LastName,
                          ShippingCode = o.ShippingCode
                      }).ToList();

        return result;
    }

    // Hàm lấy chi tiết dữ liệu
    public VoteForShipper GetVoteForShipper(int idShipper)
    {
        var listVote = _dbContext.TblVotes.Where(d => d.ShipperId == idShipper);
        if(listVote.Count() > 0)
        {
            var rate = listVote.Select(x => x.Diem).Average();
            var vote = listVote.Select(x => x.DanhGia).ToList();
            var sumVote = listVote.Count();
            var voteGood = listVote.Where(x => x.Diem > 4).Count();
            var voteAverage = listVote.Where(x => x.Diem < 4 && x.Diem > 2).Count();
            var voteBad = listVote.Where(x => x.Diem < 2).Count();
            return new VoteForShipper
            {
                Rate = rate,
                Vote = vote,
                VoteGood = voteGood,
                VoteAverage = voteAverage,  
                VoteBad = voteBad,
                VoteSum = sumVote
            };
        }
        return null;
        
    }
}

// DTOs cho TblVote
public class CreateVoteDto : TblVote
{

}

public class UpdateVoteDto
{
    public int VoteId { get; set; }
    public string VoteName { get; set; }
    public int? ProvinceId { get; set; }
}
public class VoteDto : TblVote
{
    public string ShipperName { get; set; }
    public string ClientName { get; set; }
    public string ShippingCode { get; set; }
}
public class VoteForShipper
{
    public List<string> Vote { get; set; }
    public double Rate { get; set; }
    public int VoteSum { get; set; }
    public int VoteGood { get; set; }   
    public int VoteAverage { get; set; }
    public int VoteBad { get; set; }
}
// Interface cho VoteServices
public interface IVoteServices
{
    ResponseModelBase<string> CreateVote(CreateVoteDto input);
    List<VoteDto> GetAllVotes();

    VoteForShipper GetVoteForShipper(int idShipper);
}
