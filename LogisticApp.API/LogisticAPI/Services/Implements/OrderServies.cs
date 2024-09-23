using AutoMapper;
using Logistic.Common;
using Logistic.Constants;
using LogisticAPI;
using LogisticAPI.Entities;
using System.Text;

public class OrderServices : IOrderServices
{
    private readonly LogisticDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContext;

    public OrderServices(LogisticDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _mapper = mapper;
        _httpContext = httpContext;
    }
    public static decimal TinhGia(decimal donGia, decimal quangDuong)
    {
        return donGia * quangDuong;
    }
    public ResponseModelBase<string> CreateOrder(CreateOrderDto input)
    {
        if(_dbContext.TblOrders.Any(x => x.ShippingCode == input.ShippingCode))
        {
            return new ResponseModelBase<string>
            {
                StatusCode = StatusCodeApp.BadRequest,
                Message = "Đơn hàng đã tồn tại"
            };
        }    
        var order = new TblOrder
        {
            CustomerId = input.CustomerId,
            TransportTypeId = input.TransportTypeId,
            ServiceTypeId = input.ServiceTypeId,
            WeightTypeId = input.WeightTypeId,
            OrderStatusId = 1,
            ShipperId = input.ShipperId,
            ManagerId = input.ManagerId,
            OrderFromCommuneId = input.OrderFromCommuneId,
            OrderFromDistrictId = input.OrderFromDistrictId,
            OrderFromProvinceId = input.OrderFromProvinceId,
            OrderToCommuneId = input.OrderToCommuneId,
            OrderToDistrictId = input.OrderToDistrictId,
            OrderToProvinceId = input.OrderToProvinceId,
            RecipientName = input.RecipientName,
            RecipientPhone = input.RecipientPhone,
            Note = input.Note,
            CreateDate = DateTime.Now,
            ShippingCode = input.ShippingCode,
            Latitude = input.Latitude,
            Longitude = input.Longitude
        };

        order.PriceValue = TinhGia(input.DonGia, input.QuangDuong);
        _dbContext.TblOrders.Add(order);
        _dbContext.SaveChanges();

        return new ResponseModelBase<string>
        {
            StatusCode = StatusCodeApp.Success,
            Message = "Thành công"
        };
    }
    static string GenerateRandomString(int length, string allowedChars)
    {
        Random random = new Random();
        StringBuilder result = new StringBuilder(length);

        for (int i = 0; i < length; i++)
        {
            int index = random.Next(allowedChars.Length);
            result.Append(allowedChars[index]);
        }

        return result.ToString();
    }
    // Update Order
    public void UpdateOrder(UpdateOrderDto input)
    {
        var order = _dbContext.TblOrders.FirstOrDefault(o => o.OrderId == input.OrderId);
        if (order == null)
        {
            throw new Exception($"Không tìm thấy đơn hàng với ID \"{input.OrderId}\"");
        }

        _mapper.Map(input, order);
        _dbContext.SaveChanges();
    }

    // Update Order
    public void GanShipper(UpdateOrderDto input)
    {
        var order = _dbContext.TblOrders.FirstOrDefault(o => o.OrderId == input.OrderId);
        if (order == null)
        {
            throw new Exception($"Không tìm thấy đơn hàng với ID \"{input.OrderId}\"");
        }

        order.ManagerId = input.ManagerId;
        order.ShipperId = input.ShipperId;
        order.OrderStatusId = 3;
        _dbContext.TblOrders.Update(order);
        _dbContext.SaveChanges();
    }

    // Delete Order
    public ResponseModelBase<string> DeleteOrder(int orderId)
    {
        var order = _dbContext.TblOrders.FirstOrDefault(o => o.OrderId == orderId);
        if (order == null)
        {
            return new ResponseModelBase<string>()
            {
                Message = $"Không tìm thấy đơn hàng với ID \"{orderId}\"",
                StatusCode = StatusCodeApp.BadRequest
            };
        }

        _dbContext.TblOrders.Remove(order);
        _dbContext.SaveChanges();
        return new ResponseModelBase<string>()
        {
            Message = "Thành công",
            StatusCode = StatusCodeApp.Success
        };
    }
    public ResponseModelBase<string> ChangeOrderStatus(UpdateStatusOrder model)
    {
        var order = _dbContext.TblOrders.FirstOrDefault(o => o.OrderId == model.OrderId);
        if (order == null)
        {
            return new ResponseModelBase<string>()
            {
                Message = "Không tồn tại đơn hàng",
                StatusCode = StatusCodeApp.BadRequest
            };
        }
        order.OrderStatusId = model.StatusCode;
        _dbContext.TblOrders.Update(order);
        _dbContext.SaveChanges();
        return new ResponseModelBase<string>()
        {
            StatusCode = StatusCodeApp.Success,
            Message = "Cập nhật thành công"
        };
    }
    // Get All Orders
    public ResponseModelBase<OrderResponse> GetAllOrders(int idKh)
    {
        var result = (from dt in _dbContext.TblOrders
                     join w in _dbContext.TblWeightTypes on dt.WeightTypeId equals w.WeightTypeId
                     join ht in _dbContext.TblTransportTypes on dt.TransportTypeId equals ht.TransportTypeId
                     join dv in _dbContext.TblServiceTypes on dt.ServiceTypeId equals dv.ServiceTypeId
                     join t in _dbContext.TblProvinces on dt.OrderFromProvinceId equals t.ProvinceId into tGroup
                     from t in tGroup.DefaultIfEmpty()
                     join h in _dbContext.TblDistricts on dt.OrderFromDistrictId equals h.DistrictId into hGroup
                     from h in hGroup.DefaultIfEmpty()
                     join x in _dbContext.TblCommunes on dt.OrderFromCommuneId equals x.CommuneId into xGroup
                     from x in xGroup.DefaultIfEmpty()
                     join tn in _dbContext.TblProvinces on dt.OrderToProvinceId equals tn.ProvinceId into tnGroup
                     from tn in tnGroup.DefaultIfEmpty()
                     join hn in _dbContext.TblDistricts on dt.OrderToDistrictId equals hn.DistrictId into hnGroup
                     from hn in hnGroup.DefaultIfEmpty()
                     join xn in _dbContext.TblCommunes on dt.OrderToCommuneId equals xn.CommuneId into xnGroup
                     from xn in xnGroup.DefaultIfEmpty()
                     from gh in _dbContext.Users.Where(x => x.Id == dt.ShipperId).DefaultIfEmpty()
                     from m in _dbContext.Users.Where(x => x.Id == dt.ManagerId).DefaultIfEmpty()
                     from kh in _dbContext.Users.Where(x => x.Id == dt.CustomerId).DefaultIfEmpty()
                     from tt in _dbContext.TblOrderStatuses.Where(x => x.OrderStatusId == dt.OrderStatusId).DefaultIfEmpty()
                     select new OrderResponse
                     {
                         CreateDate = dt.CreateDate,
                         CustomerId = dt.CustomerId,
                         DiaChiGiaoHang = x.CommuneName + ", " + h.DistrictName + ", " + t.ProvinceName,
                         DiaChiNhan = xn.CommuneName + ", " + h.DistrictName + ", " + tn.ProvinceName,
                         OrderToCommuneId = dt.OrderToCommuneId,
                         OrderToDistrictId = dt.OrderToDistrictId,
                         OrderToProvinceId = dt.OrderToProvinceId,
                         DichVu = dv.ServiceTypeName,
                         HinhThuc = ht.TransportTypeName,
                         KhoiLuong = w.WeightNumber.ToString(),
                         ManagerId = dt.ManagerId,
                         NguoiGiao = gh.FirstName + " " + gh.LastName,
                         NguoiQuanLy = m.FirstName + " " + m.LastName,
                         TenKhachHang = kh.FirstName + " " + kh.LastName,
                         Note = dt.Note,
                         OrderFromCommuneId = dt.OrderFromCommuneId,
                         OrderFromDistrictId = dt.OrderFromDistrictId,
                         OrderFromProvinceId = dt.OrderFromProvinceId,
                         OrderId = dt.OrderId,
                         OrderStatusId = dt.OrderStatusId,
                         PriceValue = dt.PriceValue,
                         RecipientName = dt.RecipientName,
                         RecipientPhone = dt.RecipientPhone,
                         ServiceTypeId = dt.ServiceTypeId,
                         ShipperId = dt.ShipperId,
                         ShippingCode = dt.ShippingCode,
                         TransportTypeId = dt.TransportTypeId,
                         WeightTypeId = dt.WeightTypeId,
                         TrangThai = tt.OrderStatusName,
                         EmailNguoiGiao = gh.Email,
                         SdtNguoiGiao = gh.Sdt
                     }).ToList();

        if(idKh > 0)
        {
            result = result.Where(x => x.CustomerId == idKh).ToList();
        }

        return new ResponseModelBase<OrderResponse>()
        {
            ListData = result,
            StatusCode = StatusCodeApp.Success
        };
    }

    // Get Order By Id
    public TblOrder GetOrderById(int orderId)
    {
        var order = _dbContext.TblOrders.FirstOrDefault(o => o.OrderId == orderId);
        if (order == null)
        {
            throw new Exception($"Không tìm thấy đơn hàng với ID \"{orderId}\"");
        }

        return order;
    }

    public ResponseModelBase<OrderResponse> GetOrderByMaDonHang(string maDonHang)
    {
        var order = (from dt in _dbContext.TblOrders
                      join w in _dbContext.TblWeightTypes on dt.WeightTypeId equals w.WeightTypeId
                      join ht in _dbContext.TblTransportTypes on dt.TransportTypeId equals ht.TransportTypeId
                      join dv in _dbContext.TblServiceTypes on dt.ServiceTypeId equals dv.ServiceTypeId
                      join t in _dbContext.TblProvinces on dt.OrderFromProvinceId equals t.ProvinceId into tGroup
                      from t in tGroup.DefaultIfEmpty()
                      join h in _dbContext.TblDistricts on dt.OrderFromDistrictId equals h.DistrictId into hGroup
                      from h in hGroup.DefaultIfEmpty()
                      join x in _dbContext.TblCommunes on dt.OrderFromCommuneId equals x.CommuneId into xGroup
                      from x in xGroup.DefaultIfEmpty()
                      join tn in _dbContext.TblProvinces on dt.OrderToProvinceId equals tn.ProvinceId into tnGroup
                      from tn in tnGroup.DefaultIfEmpty()
                      join hn in _dbContext.TblDistricts on dt.OrderToDistrictId equals hn.DistrictId into hnGroup
                      from hn in hnGroup.DefaultIfEmpty()
                      join xn in _dbContext.TblCommunes on dt.OrderToCommuneId equals xn.CommuneId into xnGroup
                      from xn in xnGroup.DefaultIfEmpty()
                      from gh in _dbContext.Users.Where(x => x.Id == dt.ShipperId).DefaultIfEmpty()
                      from m in _dbContext.Users.Where(x => x.Id == dt.ManagerId).DefaultIfEmpty()
                      from kh in _dbContext.Users.Where(x => x.Id == dt.CustomerId).DefaultIfEmpty()
                      from tt in _dbContext.TblOrderStatuses.Where(x => x.OrderStatusId == dt.OrderStatusId).DefaultIfEmpty()
                      where dt.ShippingCode == maDonHang
                        select new OrderResponse
                      {
                          CreateDate = dt.CreateDate,
                          CustomerId = dt.CustomerId,
                          DiaChiGiaoHang = x.CommuneName + ", " + h.DistrictName + ", " + t.ProvinceName,
                          DiaChiNhan = xn.CommuneName + ", " + h.DistrictName + ", " + tn.ProvinceName,
                          OrderToCommuneId = dt.OrderToCommuneId,
                          OrderToDistrictId = dt.OrderToDistrictId,
                          OrderToProvinceId = dt.OrderToProvinceId,
                          DichVu = dv.ServiceTypeName,
                          HinhThuc = ht.TransportTypeName,
                          KhoiLuong = w.WeightNumber.ToString(),
                          ManagerId = dt.ManagerId,
                          NguoiGiao = gh.FirstName + " " + gh.LastName,
                          NguoiQuanLy = m.FirstName + " " + m.LastName,
                          TenKhachHang = kh.FirstName + " " + kh.LastName,
                          Note = dt.Note,
                          OrderFromCommuneId = dt.OrderFromCommuneId,
                          OrderFromDistrictId = dt.OrderFromDistrictId,
                          OrderFromProvinceId = dt.OrderFromProvinceId,
                          OrderId = dt.OrderId,
                          OrderStatusId = dt.OrderStatusId,
                          PriceValue = dt.PriceValue,
                          RecipientName = dt.RecipientName,
                          RecipientPhone = dt.RecipientPhone,
                          ServiceTypeId = dt.ServiceTypeId,
                          ShipperId = dt.ShipperId,
                          ShippingCode = dt.ShippingCode,
                          TransportTypeId = dt.TransportTypeId,
                          WeightTypeId = dt.WeightTypeId,
                          TrangThai = tt.OrderStatusName
                      }).FirstOrDefault();

        if (order == null)
        {
            return new ResponseModelBase<OrderResponse>()
            {
                Data = null,
                StatusCode = StatusCodeApp.InternalServer
            };
        }

        return new ResponseModelBase<OrderResponse>()
        {
            Data = order,
            StatusCode = StatusCodeApp.Success
        };
    }
    public ResponseModelBase<ThongKeDto> ThongKeDonHang()
    {
        var query = from dt in _dbContext.TblOrders
                    join u in _dbContext.Users on dt.ShipperId equals u.Id
                    where dt.OrderStatusId >= 4
                    group new {dt, u} by new {dt.ShipperId} into g
                    select new ThongKeDto
                    {
                        MaNhanVien = g.Key.ShipperId.ToString() + "-" + g.Max(x => x.u.FirstName) + " " + g.Max(x => x.u.LastName),
                        TyLeGiaoHang = new List<int> { g.Where(x => x.dt.OrderStatusId == 4).Count(), g.Where(x => x.dt.OrderStatusId == 5).Count(), g.Where(x => x.dt.OrderStatusId == 6).Count() },
                    };
        return new ResponseModelBase<ThongKeDto>()
        {
            ListData = query.ToList()
        };
    }
    public ResponseModelBase<OrderResponse> GetOrderByShipper(int idUser, bool trangThai)
    {
        var order = (from dt in _dbContext.TblOrders
                     join w in _dbContext.TblWeightTypes on dt.WeightTypeId equals w.WeightTypeId
                     join ht in _dbContext.TblTransportTypes on dt.TransportTypeId equals ht.TransportTypeId
                     join dv in _dbContext.TblServiceTypes on dt.ServiceTypeId equals dv.ServiceTypeId
                     join t in _dbContext.TblProvinces on dt.OrderFromProvinceId equals t.ProvinceId into tGroup
                     from t in tGroup.DefaultIfEmpty()
                     join h in _dbContext.TblDistricts on dt.OrderFromDistrictId equals h.DistrictId into hGroup
                     from h in hGroup.DefaultIfEmpty()
                     join x in _dbContext.TblCommunes on dt.OrderFromCommuneId equals x.CommuneId into xGroup
                     from x in xGroup.DefaultIfEmpty()
                     join tn in _dbContext.TblProvinces on dt.OrderToProvinceId equals tn.ProvinceId into tnGroup
                     from tn in tnGroup.DefaultIfEmpty()
                     join hn in _dbContext.TblDistricts on dt.OrderToDistrictId equals hn.DistrictId into hnGroup
                     from hn in hnGroup.DefaultIfEmpty()
                     join xn in _dbContext.TblCommunes on dt.OrderToCommuneId equals xn.CommuneId into xnGroup
                     from xn in xnGroup.DefaultIfEmpty()
                     from gh in _dbContext.Users.Where(x => x.Id == dt.ShipperId).DefaultIfEmpty()
                     from m in _dbContext.Users.Where(x => x.Id == dt.ManagerId).DefaultIfEmpty()
                     from kh in _dbContext.Users.Where(x => x.Id == dt.CustomerId).DefaultIfEmpty()
                     from tt in _dbContext.TblOrderStatuses.Where(x => x.OrderStatusId == dt.OrderStatusId).DefaultIfEmpty()
                     where dt.ShipperId == idUser
                     select new OrderResponse
                     {
                         CreateDate = dt.CreateDate,
                         CustomerId = dt.CustomerId,
                         DiaChiGiaoHang = x.CommuneName + ", " + h.DistrictName + ", " + t.ProvinceName,
                         DiaChiNhan = xn.CommuneName + ", " + h.DistrictName + ", " + tn.ProvinceName,
                         OrderToCommuneId = dt.OrderToCommuneId,
                         OrderToDistrictId = dt.OrderToDistrictId,
                         OrderToProvinceId = dt.OrderToProvinceId,
                         DichVu = dv.ServiceTypeName,
                         HinhThuc = ht.TransportTypeName,
                         KhoiLuong = w.WeightNumber.ToString(),
                         ManagerId = dt.ManagerId,
                         NguoiGiao = gh.FirstName + " " + gh.LastName,
                         NguoiQuanLy = m.FirstName + " " + m.LastName,
                         TenKhachHang = kh.FirstName + " " + kh.LastName,
                         Note = dt.Note,
                         OrderFromCommuneId = dt.OrderFromCommuneId,
                         OrderFromDistrictId = dt.OrderFromDistrictId,
                         OrderFromProvinceId = dt.OrderFromProvinceId,
                         OrderId = dt.OrderId,
                         OrderStatusId = dt.OrderStatusId,
                         PriceValue = dt.PriceValue,
                         RecipientName = dt.RecipientName,
                         RecipientPhone = dt.RecipientPhone,
                         ServiceTypeId = dt.ServiceTypeId,
                         ShipperId = dt.ShipperId,
                         ShippingCode = dt.ShippingCode,
                         TransportTypeId = dt.TransportTypeId,
                         WeightTypeId = dt.WeightTypeId,
                         TrangThai = tt.OrderStatusName
                     }).ToList();
        if (trangThai == true)
        {
            order = order.Where(x => x.OrderStatusId >= 4).ToList();
        }
        else
        {
            order = order.Where(x => x.OrderStatusId == 3).ToList();
        }
        if (order == null)
        {
            return new ResponseModelBase<OrderResponse>()
            {
                Data = null,
                StatusCode = StatusCodeApp.InternalServer
            };
        }

        return new ResponseModelBase<OrderResponse>()
        {
            ListData = order,
            StatusCode = StatusCodeApp.Success
        };
    }
}
public class OrderResponse : TblOrder
{
    public string DiaChiNhan {  get; set; }
    public string DiaChiGiaoHang { get; set; }
    public string NguoiGiao {  get; set; }
    public string NguoiQuanLy { get; set; }
    public string TenKhachHang { get; set; }
    public string KhoiLuong { get; set; }
    public string HinhThuc { get; set; }
    public string DichVu {  get; set; }
    public string TrangThai {  get; set; }
    public string EmailNguoiGiao {  get; set; }
    public string SdtNguoiGiao {  get; set; }

}
public class ThongKeDto
{
    public string MaNhanVien { get; set; }
    public List<int> TyLeGiaoHang { get; set; }
}
public class UpdateStatusOrder
{
    public int StatusCode { get; set; }
    public int OrderId { get; set; }
}
public class CreateOrderDto
{
    public int? CustomerId { get; set; }
    public int? TransportTypeId { get; set; }
    public int? ServiceTypeId { get; set; }
    public int? WeightTypeId { get; set; }
    public int? OrderStatusId { get; set; }
    public int? ShipperId { get; set; }
    public int? ManagerId { get; set; }
    public int? OrderFromCommuneId { get; set; }
    public int? OrderFromDistrictId { get; set; }
    public int? OrderFromProvinceId { get; set; }
    public int? OrderToCommuneId { get; set; }
    public int? OrderToDistrictId { get; set; }
    public int? OrderToProvinceId { get; set; }
    public string RecipientName { get; set; }
    public string RecipientPhone { get; set; }
    public string Note { get; set; }
    public decimal? PriceValue { get; set; }
    public DateTime? CreateDate { get; set; }
    public string ShippingCode { get; set; }
    public decimal QuangDuong {  get; set; }
    public decimal DonGia { get; set; }
    public float? Latitude { get; set; }
    public float? Longitude { get; set; }
}

public class UpdateOrderDto : CreateOrderDto
{
    public int OrderId { get; set; }
}
public interface IOrderServices
{
    ResponseModelBase<string> CreateOrder(CreateOrderDto input);
    void UpdateOrder(UpdateOrderDto input);
    ResponseModelBase<string> DeleteOrder(int orderId);
    ResponseModelBase<OrderResponse> GetAllOrders(int idKh);
    TblOrder GetOrderById(int orderId);
    ResponseModelBase<string> ChangeOrderStatus(UpdateStatusOrder model);
    ResponseModelBase<OrderResponse> GetOrderByMaDonHang(string maDonHang);
    ResponseModelBase<OrderResponse> GetOrderByShipper(int idUser, bool trangThai);
    void GanShipper(UpdateOrderDto input);
    ResponseModelBase<ThongKeDto> ThongKeDonHang();
}