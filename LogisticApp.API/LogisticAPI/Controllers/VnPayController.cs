using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using LogisticAPI.Common;
using LogisticAPI.Dtos;
using LogisticAPI.Services.Interfaces;
using Logistic.Common;

namespace UniAdmission.API.Controllers
{
    [ApiController]
    [Route("api/vnpay")]
    public class VnPayController : ControllerBase
    {
        private readonly IVnPayServices _services;
        public VnPayController(IVnPayServices services)
        {
            _services = services;
        }
        /// <summary>
        /// Lấy danh sách đợt tuyển sinh có lọc
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpPost, Route("pay")]
        public IActionResult Filter([FromBody] VnPayModel model)
        {
            var result = _services.GetUrl(model);
            return Ok(new ResponseModelBase<string>()
            {
                Data = result
            });
        }
        [HttpGet, Route("pay-info")]
        public IActionResult PayInfor(int idHoSo)
        {
            var result = _services.GetThongTinThanhToan(idHoSo);
            return Ok(result);
        }
    }
}
