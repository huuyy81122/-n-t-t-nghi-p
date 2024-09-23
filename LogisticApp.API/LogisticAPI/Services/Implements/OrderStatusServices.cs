using AutoMapper;
using LogisticAPI.Entities;
using LogisticAPI;

public class OrderStatusServices : IOrderStatusServices
{
    private readonly LogisticDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContext;

    public OrderStatusServices(LogisticDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _mapper = mapper;
        _httpContext = httpContext;
    }

    // Hàm thêm cho TblOrderStatus
    public void CreateOrderStatus(CreateOrderStatusDto input)
    {
        if (_dbContext.TblOrderStatuses.Any(os => os.OrderStatusName == input.OrderStatusName))
        {
            throw new Exception($"Trạng thái đơn hàng \"{input.OrderStatusName}\" đã tồn tại");
        }

        _dbContext.TblOrderStatuses.Add(new TblOrderStatus
        {
            OrderStatusName = input.OrderStatusName
        });

        _dbContext.SaveChanges();
    }

    // Hàm sửa cho TblOrderStatus
    public void UpdateOrderStatus(UpdateOrderStatusDto input)
    {
        var orderStatus = _dbContext.TblOrderStatuses.FirstOrDefault(os => os.OrderStatusId == input.OrderStatusId);
        if (orderStatus == null)
        {
            throw new Exception($"Không tìm thấy trạng thái đơn hàng với ID \"{input.OrderStatusId}\"");
        }

        orderStatus.OrderStatusName = input.OrderStatusName;

        _dbContext.SaveChanges();
    }

    // Hàm xóa cho TblOrderStatus
    public void DeleteOrderStatus(int orderStatusId)
    {
        var orderStatus = _dbContext.TblOrderStatuses.FirstOrDefault(os => os.OrderStatusId == orderStatusId);
        if (orderStatus == null)
        {
            throw new Exception($"Không tìm thấy trạng thái đơn hàng với ID \"{orderStatusId}\"");
        }

        _dbContext.TblOrderStatuses.Remove(orderStatus);
        _dbContext.SaveChanges();
    }

    // Hàm lấy toàn bộ dữ liệu
    public List<TblOrderStatus> GetAllOrderStatuses()
    {
        return _dbContext.TblOrderStatuses.ToList();
    }

    // Hàm lấy chi tiết dữ liệu
    public TblOrderStatus GetOrderStatusById(int orderStatusId)
    {
        var orderStatus = _dbContext.TblOrderStatuses.FirstOrDefault(os => os.OrderStatusId == orderStatusId);
        if (orderStatus == null)
        {
            throw new Exception($"Không tìm thấy trạng thái đơn hàng với ID \"{orderStatusId}\"");
        }

        return orderStatus;
    }
}

// DTOs cho TblOrderStatus
public class CreateOrderStatusDto
{
    public string OrderStatusName { get; set; }
}

public class UpdateOrderStatusDto
{
    public int OrderStatusId { get; set; }
    public string OrderStatusName { get; set; }
}

// Interface cho OrderStatusServices
public interface IOrderStatusServices
{
    void CreateOrderStatus(CreateOrderStatusDto input);
    void UpdateOrderStatus(UpdateOrderStatusDto input);
    void DeleteOrderStatus(int orderStatusId);
    List<TblOrderStatus> GetAllOrderStatuses();
    TblOrderStatus GetOrderStatusById(int orderStatusId);
}
