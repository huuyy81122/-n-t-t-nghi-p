using Azure;
using LogisticAPI.Common;
using LogisticAPI.Dtos;
using LogisticAPI.Services.Interfaces;

namespace LogisticAPI.Services.Implements
{
    public class VnPayServices: IVnPayServices
    {
        public IConfiguration _configuration { get; set; }
        public LogisticDbContext _db { get; set; }
        public VnPayServices(IConfiguration configuration, LogisticDbContext db) 
        {
            _configuration = configuration;
            _db = db;
        }  
        public string GetUrl(VnPayModel order)
        {
            //Get Config Info
            string vnp_Returnurl = _configuration["vnp_Returnurl"]; //URL nhan ket qua tra ve 
            string vnp_Url = _configuration["vnp_Url"]; //URL thanh toan cua VNPAY 
            string vnp_TmnCode = _configuration["vnp_TmnCode"]; //Ma định danh merchant kết nối (Terminal Id)
            string vnp_HashSecret = _configuration["vnp_HashSecret"]; //Secret Key

            //Get payment input
            order.OrderId = DateTime.Now.Ticks; // Giả lập mã giao dịch hệ thống merchant gửi sang VNPAY
            /*order.Amount = 100000; // Giả lập số tiền thanh toán hệ thống merchant gửi sang VNPAY 100,000 VND*/
            order.Status = "0"; //0: Trạng thái thanh toán "chờ thanh toán" hoặc "Pending" khởi tạo giao dịch chưa có IPN
            order.CreatedDate = DateTime.Now;
            //Save order to db

            //Build URL for VNPAY
            VnPayLibrary vnpay = new VnPayLibrary();

            vnpay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
            vnpay.AddRequestData("vnp_Amount", (order.Amount * 100).ToString()); //Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. Để gửi số tiền thanh toán là 100,000 VND (một trăm nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 10000000
           
            vnpay.AddRequestData("vnp_BankCode", "VNBANK");
            

            vnpay.AddRequestData("vnp_CreateDate", order.CreatedDate.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress());
            vnpay.AddRequestData("vnp_Locale", "vn");
            vnpay.AddRequestData("vnp_OrderInfo", order.OrderDesc);
            vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other

            vnpay.AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
            vnpay.AddRequestData("vnp_TxnRef", order.OrderId.ToString()); // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày

            //Add Params of 2.1.0 Version
            //Billing

            string paymentUrl = vnpay.CreateRequestUrl(vnp_Url, vnp_HashSecret);
            return paymentUrl;
        }

        public PayInfo GetThongTinThanhToan(int orderId)
        {
            var order = _db.TblOrders.FirstOrDefault(x => x.OrderId == orderId);
            if(order != null)
            {
                return new PayInfo()
                {
                    SoTienThanhToan = order.PriceValue,
                    NoiDungThanhToan = "DONHANG_" + order.OrderId.ToString("000000") + "_thanh_toan_don_hang" + order?.CreateDate.ToString()
                };
            }
            else
            {
                return null;
            }
        }
    }
}
