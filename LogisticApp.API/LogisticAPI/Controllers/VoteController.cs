using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class VoteController : ControllerBase
{
    private readonly IVoteServices _VoteServices;

    public VoteController(IVoteServices VoteServices)
    {
        _VoteServices = VoteServices;
    }

    [HttpPost]
    public IActionResult CreateVote([FromBody] CreateVoteDto input)
    {
        return Ok(_VoteServices.CreateVote(input));
    }

    [HttpGet]
    public IActionResult GetAllVotes()
    {
        var Votes = _VoteServices.GetAllVotes();
        return Ok(Votes);
    }

    [HttpGet("for-shipper")]
    public IActionResult GetVoteById([FromQuery]int idShipper)
    {
        var Vote = _VoteServices.GetVoteForShipper(idShipper);
        return Ok(Vote);
    }
}