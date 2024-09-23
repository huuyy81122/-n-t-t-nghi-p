using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class DistrictController : ControllerBase
{
    private readonly IDistrictServices _districtServices;

    public DistrictController(IDistrictServices districtServices)
    {
        _districtServices = districtServices;
    }

    [HttpPost]
    public IActionResult CreateDistrict([FromBody] CreateDistrictDto input)
    {
        _districtServices.CreateDistrict(input);
        return Ok("District created successfully");
    }

    [HttpPut]
    public IActionResult UpdateDistrict([FromBody] UpdateDistrictDto input)
    {
        _districtServices.UpdateDistrict(input);
        return Ok("District updated successfully");
    }

    [HttpDelete("{districtId}")]
    public IActionResult DeleteDistrict(int districtId)
    {
        _districtServices.DeleteDistrict(districtId);
        return Ok("District deleted successfully");
    }

    [HttpGet]
    public IActionResult GetAllDistricts()
    {
        var districts = _districtServices.GetAllDistricts();
        return Ok(districts);
    }

    [HttpGet("{id}")]
    public IActionResult GetDistrictById(int id)
    {
        var district = _districtServices.GetDistrictById(id);
        if (district != null)
        {
            return Ok(district);
        }
        return NotFound("District not found");
    }
}