using Microsoft.AspNetCore.Mvc;

namespace LogisticAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderServices _orderServices;

        public OrderController(IOrderServices orderServices)
        {
            _orderServices = orderServices;
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] CreateOrderDto input)
        {
            var res = _orderServices.CreateOrder(input);
            return Ok(res);
        }

        [HttpPut]
        public IActionResult UpdateOrder([FromBody] UpdateOrderDto input)
        {
            _orderServices.UpdateOrder(input);
            return Ok("Order updated successfully");
        }

        [HttpDelete("{orderId}")]
        public IActionResult DeleteOrder(int orderId)
        {
            var result = _orderServices.DeleteOrder(orderId);
            return Ok(result);
        }

        [HttpGet("")]
        public IActionResult GetAllOrders(int idKh = 0)
        {
            var orders = _orderServices.GetAllOrders(idKh);
            return Ok(orders);
        }

        [HttpGet("{orderId}")]
        public IActionResult GetOrderById(int orderId)
        {
            var order = _orderServices.GetOrderById(orderId);
            return Ok(order);
        }

        [HttpPost("update-status")]
        public IActionResult UpdateStatus(UpdateStatusOrder model)
        {
            var order = _orderServices.ChangeOrderStatus(model);
            return Ok(order);
        }

        [HttpGet("ma-don-hang")]
        public IActionResult GetDonHangByMa([FromQuery]string maDonHang)
        {
            var order = _orderServices.GetOrderByMaDonHang(maDonHang);
            return Ok(order);
        }

        [HttpGet("for-shipper")]
        public IActionResult GetDonHangForShipper([FromQuery] int idUser,bool trangThai = false)
        {
            var order = _orderServices.GetOrderByShipper(idUser, trangThai);
            return Ok(order);
        }

        [HttpPost("gan-shipper")]
        public IActionResult GanShipper(UpdateOrderDto orderDto)
        {
            _orderServices.GanShipper(orderDto);
            return Ok();
        }

        [HttpGet("thong-ke")]
        public IActionResult ThongKe()
        {
            return Ok(_orderServices.ThongKeDonHang());
        }
    }
}