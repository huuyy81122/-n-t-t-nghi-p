using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Logistic.Common;
using Logistic.Constants;
using Logistic.Dtos.User;
using Logistic.Services.Interfaces;
using LogisticAPI;

namespace Logistic.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;
        private MailUtils _mailUtils;
        private readonly IConfiguration _configuration;
        private readonly LogisticDbContext _dbContext;
        private readonly IHttpContextAccessor _httpContext;
        public UserController(IUserServices userServices, IConfiguration configuration, LogisticDbContext dbContext, IHttpContextAccessor httpContext)
        {
            _userServices = userServices;
            _configuration = configuration;
            _dbContext = dbContext;
            _mailUtils = new MailUtils(configuration);
            _httpContext = httpContext;
        }

        [HttpPost("create")]
        public ResponseModelBase<bool> Create(CreateUserDto input)
        {
            try
            {
                _userServices.Create(input);
                return new ResponseModelBase<bool>()
                {
                    Data = true,
                    Message = "Tạo tài khoản thành công",
                    StatusCode = StatusCodeApp.Success
                };
            }
            catch (Exception ex)
            {
                return new ResponseModelBase<bool>()
                {
                    Data = true,
                    Message = ex.Message,
                    StatusCode = StatusCodeApp.InternalServer
                };
            }
        }

        [HttpPost("login")]
        public ResponseLogin Login(LoginDto input)
        {
            try
            {
                string token = _userServices.Login(input);
                return new ResponseLogin()
                {
                    Message = "Đăng nhập thành công",
                    Token = token,
                    StatusCode = StatusCodeApp.Success
                };
            }
            catch (Exception ex)
            {
                return new ResponseLogin()
                {
                    Message = ex.Message,
                    Token = null,
                    StatusCode = StatusCodeApp.InternalServer
                };
            }
        }

        [HttpGet("get-user-by-email")]
      /*  [Authorize]*/
        public IActionResult GetUserByEmail([FromQuery] string email)
        {
            try
            {
                var UserDto = _userServices.GetUserByEmail(email);
                if (UserDto == null)
                {
                    return BadRequest("Người dùng không tồn tại");
                }
                return Ok(UserDto);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update-user-by-email")]
    /*    [Authorize]*/
        public IActionResult UpdateUserInfoByEmail(UpdateUserDto input, string email)
        {
            try
            {
                var NewUser = _userServices.UpdateUserByEmail(input, email);
                if (NewUser == null)
                {
                    return BadRequest("Người dùng không tồn tại");
                }
                return Ok(NewUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("quen-mat-khau")]
        public ResponseModelBase<string> ForgotPassword(string email)
        {
            try
            {
                var result = _userServices.ForgotPassword(email);
                if (result == null)
                {
                    return new ResponseModelBase<string>()
                    {
                        Message = "Email không tồn tại",
                        StatusCode = StatusCodeApp.BadRequest
                    };
                }
                var emailTemplate = _dbContext.EmailTemplates.FirstOrDefault(x => x.EmailCode == "Quen_mat_khau");
                var user = _userServices.GetUserByEmail(email);
                var body = emailTemplate?.Body.Replace("@Ho_ten", user?.FirstName + " " + user?.LastName);
                body = body.Replace("@Mat_khau", result);
                _mailUtils.SendEmail(email, "Quên mật khẩu", body);

                return new ResponseModelBase<string>()
                {
                    Message = "Thành công",
                    StatusCode = StatusCodeApp.Success
                };
            }
            catch (Exception ex)
            {
                return new ResponseModelBase<string>()
                {
                    Message = "Thất bại",
                    StatusCode = StatusCodeApp.InternalServer
                };
            }
        }

        [HttpPost("thay-doi-mat-khau")]
       /* [Authorize]*/
        public ResponseModelBase<bool> ChangePassword(ChangePasswordDto input)
        {
            try
            {
                var result = _userServices.ChangePassword(input);
                if (result)
                {
                    return new ResponseModelBase<bool>()
                    {
                        Data = true,
                        Message = "Thay đổi mật khẩu thành công",
                        StatusCode = StatusCodeApp.Success
                    };
                }
                return new ResponseModelBase<bool>()
                {
                    Data = false,
                    Message = "Mật khẩu không khớp",
                    StatusCode = StatusCodeApp.BadRequest
                };
            }
            catch (Exception ex)
            {
                return new ResponseModelBase<bool>()
                {
                    Data = false,
                    Message = "Thất bại",
                    StatusCode = StatusCodeApp.InternalServer
                };
            }
        }

        [HttpGet("get-current-user")]
       /* [Authorize]*/
        public ResponseModelBase<GetUserDto> GetCurrentUser()
        {
            try
            {
                var result = _userServices.GetCurrentUser();
                if (result == null)
                {
                    return new ResponseModelBase<GetUserDto>()
                    {
                        Data = null,
                        Message = "Không tìm thấy user",
                        StatusCode = StatusCodeApp.NotFound
                    };
                }
                return new ResponseModelBase<GetUserDto>()
                {
                    Data = result,
                    Message = "Thành công",
                    StatusCode = StatusCodeApp.Success
                };
            }
            catch (Exception ex)
            {
                return new ResponseModelBase<GetUserDto>()
                {
                    Data = null,
                    Message = "Thất bại",
                    StatusCode = StatusCodeApp.InternalServer
                };
            }
        }

        [HttpGet("get-all-user")]
     /*   [Authorize]*/
        public ResponseModelBase<GetUserDto> GetAllUser(int idRole = 0, bool deXuat = false)
        {
            try
            {
                var result = _userServices.GetAllUser(idRole, deXuat);
                if (result == null)
                {
                    return new ResponseModelBase<GetUserDto>()
                    {
                        Data = null,
                        Message = "Không tìm thấy user",
                        StatusCode = StatusCodeApp.NotFound
                    };
                }
                return new ResponseModelBase<GetUserDto>()
                {
                    ListData = result,
                    Message = "Thành công",
                    StatusCode = StatusCodeApp.Success
                };
            }
            catch (Exception ex)
            {
                return new ResponseModelBase<GetUserDto>()
                {
                    Data = null,
                    Message = "Thất bại",
                    StatusCode = StatusCodeApp.InternalServer
                };
            }
        }

        [HttpGet("get-user-by-id")]
        /*   [Authorize]*/
        public IActionResult GetUserById([FromQuery]int id = 0)
        {
            try
            {
                var result = _userServices.GetUserById(id);
                if (result == null)
                {
                    return BadRequest("Người dùng không tồn tại");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("")]
        /*    [Authorize]*/
        public IActionResult Update(UpdateUserDto input)
        {
            try
            {
                var NewUser = _userServices.Update(input);
                if (NewUser == null)
                {
                    return BadRequest("Người dùng không tồn tại");
                }
                return Ok(NewUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("")]
        /*    [Authorize]*/
        public IActionResult Delete(int id)
        {
            try
            {
                var NewUser = _userServices.Delete(id);
                if (NewUser == null)
                {
                    return BadRequest("Người dùng không tồn tại");
                }
                return Ok(NewUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update-status")]
        /*    [Authorize]*/
        public IActionResult UpdateStatus(UpdateUserDto input)
        {
            try
            {
                var NewUser = _userServices.UpdateStatus(input);
                
                return Ok(NewUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
