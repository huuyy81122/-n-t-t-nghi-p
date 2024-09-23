using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CommuneController : ControllerBase
{
    private readonly ICommuneServices _communeServices;

    public CommuneController(ICommuneServices communeServices)
    {
        _communeServices = communeServices;
    }

    // API thêm xã
    [HttpPost]
    public IActionResult Create([FromBody] CreateCommuneDto dto)
    {
        _communeServices.CreateCommune(dto);
        return Ok(new { message = "Xã được tạo thành công" });
    }

    // API sửa xã
    [HttpPut]
    public IActionResult Update([FromBody] UpdateCommuneDto dto)
    {
        _communeServices.UpdateCommune(dto);
        return Ok(new { message = "Xã được cập nhật thành công" });
    }

    // API xóa xã
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _communeServices.DeleteCommune(id);
        return NoContent();
    }

    // API lấy toàn bộ xã
    [HttpGet]
    public IActionResult GetAll()
    {
        var result = _communeServices.GetAllCommunes();
        return Ok(result);
    }

    // API lấy xã theo ID
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var result = _communeServices.GetCommuneById(id);
        return Ok(result);
    }
}
