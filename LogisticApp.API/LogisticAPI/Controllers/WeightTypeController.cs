using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class WeightTypeController : ControllerBase
{
    private readonly IWeightTypeServices _weightTypeServices;

    public WeightTypeController(IWeightTypeServices weightTypeServices)
    {
        _weightTypeServices = weightTypeServices;
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateWeightTypeDto dto)
    {
        _weightTypeServices.CreateWeightType(dto);
        return Ok();
    }

    [HttpPut]
    public IActionResult Update([FromBody] UpdateWeightTypeDto dto)
    {
        _weightTypeServices.UpdateWeightType(dto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _weightTypeServices.DeleteWeightType(id);
        return NoContent();
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var result = _weightTypeServices.GetAllWeightTypes();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var result = _weightTypeServices.GetWeightTypeById(id);
        return Ok(result);
    }
}