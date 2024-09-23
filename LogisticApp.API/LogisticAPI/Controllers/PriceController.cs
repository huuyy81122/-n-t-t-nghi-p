using LogisticAPI.Entities;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PriceController : ControllerBase
{
    private readonly IPriceServices _priceServices;

    public PriceController(IPriceServices priceServices)
    {
        _priceServices = priceServices;
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreatePriceDto dto)
    {
        _priceServices.CreatePrice(dto);
        return Ok();
    }

    [HttpPut]
    public IActionResult Update([FromBody] UpdatePriceDto dto)
    {
        _priceServices.UpdatePrice(dto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _priceServices.DeletePrice(id);
        return NoContent();
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var result = _priceServices.GetAllPrices();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var result = _priceServices.GetPriceById(id);
        return Ok(result);
    }

    [HttpPost("get-detail")]
    public IActionResult GetDetail(TblPrice model)
    {
        var result = _priceServices.GetDetail(model);
        return Ok(result);
    }
}
