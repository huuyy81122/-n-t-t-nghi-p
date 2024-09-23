using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProvinceController : ControllerBase
{
    private readonly IProvinceServices _provinceServices;

    public ProvinceController(IProvinceServices provinceServices)
    {
        _provinceServices = provinceServices;
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateProvinceDto dto)
    {
        _provinceServices.CreateProvince(dto);
        return Ok();
    }

    [HttpPut]
    public IActionResult Update([FromBody] UpdateProvinceDto dto)
    {
        _provinceServices.UpdateProvince(dto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _provinceServices.DeleteProvince(id);
        return NoContent();
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var result = _provinceServices.GetAllProvinces();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var result = _provinceServices.GetProvinceById(id);
        return Ok(result);
    }
}
