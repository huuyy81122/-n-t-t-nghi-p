using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TransportTypeController : ControllerBase
{
    private readonly ITransportTypeServices _transportTypeServices;

    public TransportTypeController(ITransportTypeServices transportTypeServices)
    {
        _transportTypeServices = transportTypeServices;
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateTransportTypeDto dto)
    {
        _transportTypeServices.CreateTransportType(dto);
        return Ok();
    }

    [HttpPut]
    public IActionResult Update([FromBody] UpdateTransportTypeDto dto)
    {
        _transportTypeServices.UpdateTransportType(dto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _transportTypeServices.DeleteTransportType(id);
        return NoContent();
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var result = _transportTypeServices.GetAllTransportTypes();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var result = _transportTypeServices.GetTransportTypeById(id);
        return Ok(result);
    }
}
