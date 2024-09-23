using Logistic.Dtos.User;
using Logistic.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class GoongDistanceMatrixResponse
{
    public Row[] rows { get; set; }
}

public class Row
{
    public Element[] elements { get; set; }
}

public class Element
{
    public Distance distance { get; set; }
}

public class Distance
{
    public double value { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class RecommendationController : ControllerBase
{
    private readonly IOrderServices _orderService;
    private readonly IUserServices _userServices;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly string _goongApiKey = "oez7ESV06v0Veo4RLW4PKHkSPrWrTPk8jA4VUyP5";

    public RecommendationController(IOrderServices orderService, IHttpClientFactory httpClientFactory, IUserServices userServices)
    {
        _orderService = orderService;
        _httpClientFactory = httpClientFactory;
        _userServices = userServices;
    }

    [HttpGet("recommend-shipper/{orderId}")]
    public async Task<GetUserDto> RecommendShipper(int orderId)
    {
        var order = _orderService.GetOrderById(orderId);
        var shippers = _userServices.GetAllUser(4, false);

        double minDistance = double.MaxValue;
        double maxDistance = double.MinValue;

        foreach (var shipper in shippers)
        {
            var distance = await GetDistanceAsync(shipper.Latitude, shipper.Longitude, order.Latitude, order.Latitude);
            shipper.Distance = distance;

            if (distance < minDistance) minDistance = distance;
            if (distance > maxDistance) maxDistance = distance;
        }

        const double alpha = 0.5; // trọng số cho khoảng cách
        const double beta = 0.5; // trọng số cho điểm đánh giá

        foreach (var shipper in shippers)
        {
            double normalizedDistance = (maxDistance - shipper.Distance) / (maxDistance - minDistance);
            double normalizedRating = (shipper.Rate - 1) / 4;
            shipper.Score = alpha * normalizedDistance + beta * normalizedRating;
        }

        var recommendedShipper = shippers.Where(x => x.Verify).OrderByDescending(s => s.Score).FirstOrDefault();

        return recommendedShipper;
    }

    private async Task<double> GetDistanceAsync(float? originLat, float? originLng, float? destLat, float? destLng)
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetStringAsync($"https://rsapi.goong.io/DistanceMatrix?origins={originLat},{originLng}&destinations={destLat},{destLng}&vehicle=car&api_key={_goongApiKey}");
        var result = JsonConvert.DeserializeObject<GoongDistanceMatrixResponse>(response);

        return result.rows.FirstOrDefault()?.elements.FirstOrDefault()?.distance.value ?? 0;
    }
}