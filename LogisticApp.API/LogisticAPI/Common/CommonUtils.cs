using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Logistic.Common
{
    public static class CommonUtils
    {
        public static string CreateMD5(string input)
        {
            // Use input string to calculate MD5 hash
            MD5 md5 = MD5.Create();
            byte[] inputBytes = Encoding.UTF8.GetBytes(input);
            byte[] hashBytes = md5.ComputeHash(inputBytes);
            return Convert.ToHexString(hashBytes);
        }

        public static int GetCurrentUserId(IHttpContextAccessor httpContextAccessor)
        {
            var claims = httpContextAccessor.HttpContext?.User?.Identity as ClaimsIdentity;
            //nếu trong program dùng JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            //thì các claim type sẽ không bị ghi đè tên nên phải dùng trực tiếp "sub"
            var claim = claims?.FindFirst(JwtRegisteredClaimNames.Sub) ?? claims?.FindFirst("sub");
            if (claim == null)
            {
                throw new Exception($"Tài khoản không chứa claim \"{System.Security.Claims.ClaimTypes.NameIdentifier}\"");
            }
            int userId = int.Parse(claim.Value);
            return userId;
        }

        public static string GetUserIdFromToken(IHttpContextAccessor httpContextAccessor)
        {
            var token = httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (token != null)
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

                if (jsonToken != null)
                {
                    var userId = jsonToken.Claims.First(claim => claim.Type == "sub").Value;
                    return userId;
                }
            }

            return null;
        }
    }
}
