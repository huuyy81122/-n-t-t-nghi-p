using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ServiceTypeController : ControllerBase
{
    private readonly IServiceTypeServices _serviceTypeServices;

    public ServiceTypeController(IServiceTypeServices serviceTypeServices)
    {
        _serviceTypeServices = serviceTypeServices;
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateServiceTypeDto dto)
    {
        _serviceTypeServices.CreateServiceType(dto);
        return Ok();
    }

    [HttpPut]
    public IActionResult Update([FromBody] UpdateServiceTypeDto dto)
    {
        _serviceTypeServices.UpdateServiceType(dto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _serviceTypeServices.DeleteServiceType(id);
        return NoContent();
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var result = _serviceTypeServices.GetAllServiceTypes();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var result = _serviceTypeServices.GetServiceTypeById(id);
        return Ok(result);
    }
}
