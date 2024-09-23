using LogisticAPI.Common;
using LogisticAPI.Dtos;
using LogisticAPI.Entities;

namespace LogisticAPI.Services.Interfaces
{
    public interface IVnPayServices
    {
        string GetUrl(VnPayModel order);
        PayInfo GetThongTinThanhToan(int idHoSo);
    }
}
