using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrderStatusController : ControllerBase
{
    private readonly IOrderStatusServices _orderStatusServices;

    public OrderStatusController(IOrderStatusServices orderStatusServices)
    {
        _orderStatusServices = orderStatusServices;
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateOrderStatusDto dto)
    {
        _orderStatusServices.CreateOrderStatus(dto);
        return Ok();
    }

    [HttpPut]
    public IActionResult Update([FromBody] UpdateOrderStatusDto dto)
    {
        _orderStatusServices.UpdateOrderStatus(dto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _orderStatusServices.DeleteOrderStatus(id);
        return NoContent();
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var result = _orderStatusServices.GetAllOrderStatuses();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var result = _orderStatusServices.GetOrderStatusById(id);
        return Ok(result);
    }
}
