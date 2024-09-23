using LogisticAPI.Common;

namespace LogisticAPI.Dtos
{
    public class VnPayModel : OrderInfo
    {
    }
    public class PayInfo
    {
        public decimal? SoTienThanhToan { get; set; }
        public string NoiDungThanhToan { get; set; }
    }
}
