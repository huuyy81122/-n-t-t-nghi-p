using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Logistic.Common;
using Logistic.Constants;
using Logistic.Dtos.User;
using Logistic.Entities;
using Logistic.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LogisticAPI;

namespace Logistic.Services.Implements
{
    public class UserServies : IUserServices
    {
        private readonly LogisticDbContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IVoteServices _voteServices;
        public UserServies(LogisticDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext, IVoteServices voteServices)
        {
            _dbContext = dbContext;
            _configuration = configuration;
            _mapper = mapper;
            _httpContext = httpContext;
            _voteServices = voteServices;
        }

        public void Create(CreateUserDto input)
        {
            if (_dbContext.Users.Any(u => u.Email == input.Email))
            {
                throw new Exception($"Tên tài khoản \"{input.Email}\" đã tồn tại");
            }
            _dbContext.Users.Add(new User
            {
                Email = input.Email,
                Password = CommonUtils.CreateMD5(input.Password),
                CreateAt = DateTime.Now,
                Deleted = false, 
                FirstName = input.FirstName, 
                IdRole = input.IdRole == 0 ? UserType.User : input.IdRole,
                LastName = input.LastName,
                Sdt = input.Sdt,
                GioiTInh = "",
                UpdateAt = DateTime.Now,
                Longitude = input.Longitude,
                Latitude = input.Latitude
            });
            _dbContext.SaveChanges();
        }

        public string Login(LoginDto input)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == input.Email);
            if (user == null)
            {
                throw new Exception($"Tài khoản \"{input.Email}\" không tồn tại");
            }

            if (CommonUtils.CreateMD5(input.Password) == user.Password)
            {
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Name, user.FirstName.ToString() + ' ' + user.LastName.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(CustomClaimRoles.UserType, user.IdRole.ToString()),
                    new Claim(CustomClaimRoles.Sdt, user.Sdt.ToString()),
                    new Claim(CustomClaimRoles.UserId, user.Id.ToString()),
                    new Claim(CustomClaimRoles.StatusUser, user.Verify.ToString())
                };

                var token = new JwtSecurityToken(
                    expires: DateTime.Now.AddSeconds(_configuration.GetValue<int>("JWT:Expires")),
                    claims: claims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            else
            {
                throw new Exception($"Mật khẩu không chính xác");
            }
        }

        public GetUserDto GetUserByEmail(string email)
        {
            var UserInfo = _dbContext.Users.FirstOrDefault(userInfo =>  userInfo.Email == email);
            if (UserInfo != null)
            {
                GetUserDto userDto = _mapper.Map<GetUserDto>(UserInfo);
                return userDto;
            } else
            {
                return null;
            }
        }

        public UpdateUserDto UpdateUserByEmail(UpdateUserDto input, string email)
        {
            var UserInfo = _dbContext.Users.FirstOrDefault(user => user.Email == email);
            if (UserInfo != null)
            {
                UserInfo.FirstName = input.FirstName;
                UserInfo.LastName = input.LastName;
                UserInfo.Email = input.Email;
                UserInfo.Sdt = input.Sdt;
                UserInfo.GioiTInh = input.GioiTInh;
                UserInfo.NgayThangNamSinh = input.NgayThangNamSinh;
                UserInfo.UpdateAt = DateTime.Now;
                _dbContext.SaveChanges();
                return input;
            }
            throw null;
        }
        public string ForgotPassword(string email)
        {
            var user = _dbContext.Users.FirstOrDefault(user => user.Email == email);
            if(user != null) 
            {
                // Khai báo các ký tự cho chuỗi ngẫu nhiên
                string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                // Tạo đối tượng Random
                Random random = new Random();

                StringBuilder randomString = new StringBuilder();
                for (int i = 0; i < 8; i++)
                {
                    int index = random.Next(characters.Length);
                    randomString.Append(characters[index]);
                }

                string finalRandomString = randomString.ToString();

                user.Password = CommonUtils.CreateMD5(finalRandomString);
                _dbContext.SaveChanges();

                return finalRandomString;
            }

            return null;
        }

        public bool ChangePassword(ChangePasswordDto input)
        {
            var email = _httpContext.HttpContext.User.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Name);
            if(email != null)
            {
                var user = _dbContext.Users.FirstOrDefault(x => x.Email == email.Value && x.Password == CommonUtils.CreateMD5(input.Password));
                if (user != null)
                {
                    user.Password = CommonUtils.CreateMD5(input.NewPassword);
                    _dbContext.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }    
            return false;
        }

        public GetUserDto GetCurrentUser()
        {
            var email = _httpContext.HttpContext.User.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Name);
            var result = GetUserByEmail(email.Value);
            return result;
        }

        public List<GetUserDto> GetAllUser(int idRole, bool deXuat)
        {
            var query = (from user in _dbContext.Users
                         where user.Deleted == false
                         select new GetUserDto
                         {
                             IdRole = user.IdRole,
                             Deleted = user.Deleted,
                             CreateAt = user.CreateAt,
                             Email = user.Email,
                             FirstName = user.FirstName,
                             GioiTInh = user.GioiTInh,
                             Id = user.Id,
                             LastName = user.LastName,
                             Sdt = user.Sdt,
                             UpdateAt = user.UpdateAt,
                             Verify = user.Verify,
                             Latitude = user.Latitude,
                             Longitude = user.Longitude
                         });

            if (idRole > 0)
            {
                query = query.Where(x => x.IdRole == idRole);
            }
            if (deXuat)
            {
                query = query.Where(x => x.Verify);
            }

            // Thực hiện truy vấn và lấy dữ liệu vào một danh sách trước
            var users = query.ToList();

            foreach (var item in users)
            {
                item.Rate = _dbContext.TblVotes
                            .Where(d => d.ShipperId == item.Id)
                            .AsEnumerable()  // Chuyển đổi sang client-side evaluation
                            .Select(x => x.Diem)
                            .DefaultIfEmpty(0)
                            .Average();
            }
            return users;
        }

        public GetUserDto GetUserById(int id)
        {
            var UserInfo = _dbContext.Users.FirstOrDefault(userInfo => userInfo.Id == id);
            if (UserInfo != null)
            {
                GetUserDto userDto = _mapper.Map<GetUserDto>(UserInfo);
                return userDto;
            }
            else
            {
                return null;
            }
        }

        public UpdateUserDto Update(UpdateUserDto input)
        {
            var UserInfo = _dbContext.Users.FirstOrDefault(user => user.Id == input.Id);
            if (UserInfo != null)
            {
                if (input.UpdatePassword)
                {
                    UserInfo.Password = CommonUtils.CreateMD5(input.Password);
                }
                UserInfo.FirstName = input.FirstName;
                UserInfo.IdRole = input.IdRole;
                UserInfo.LastName = input.LastName;
                UserInfo.Email = input.Email;
                UserInfo.Sdt = input.Sdt;
                UserInfo.GioiTInh = input.GioiTInh;
                UserInfo.NgayThangNamSinh = input.NgayThangNamSinh;
                UserInfo.Latitude = input.Latitude;
                UserInfo.Longitude = UserInfo.Longitude;
                UserInfo.UpdateAt = DateTime.Now;
                _dbContext.SaveChanges();
                return input;
            }
            throw null;
        }

        public ResponseModelBase<string> Delete(int id)
        {
            var UserInfo = _dbContext.Users.FirstOrDefault(user => user.Id == id);
            if (UserInfo != null)
            {
                _dbContext.Users.Remove(UserInfo);
                _dbContext.SaveChanges();
                return new ResponseModelBase<string>()
                {
                    Data = "Thành công",
                    StatusCode = StatusCodeApp.Success
                };
            }
            return null;
        }
        public ResponseModelBase<string> UpdateStatus(UpdateUserDto input)
        {
            var UserInfo = _dbContext.Users.FirstOrDefault(user => user.Id == input.Id);
            if (UserInfo != null)
            {
                UserInfo.Verify = input.TrangThaiNhanHang;
                _dbContext.Users.Update(UserInfo);
                _dbContext.SaveChanges();
                return new ResponseModelBase<string>()
                {
                    Data = "Thành công",
                    StatusCode = StatusCodeApp.Success
                };
            }
            return new ResponseModelBase<string>()
            {
                Data = "Thất bại",
                StatusCode = StatusCodeApp.InternalServer
            };
        }
    }
}
