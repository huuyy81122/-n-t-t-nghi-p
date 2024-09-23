using AutoMapper;
using Logistic.Dtos.User;
using Logistic.Entities;

namespace Logistic.Common
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, GetUserDto>();
            CreateMap<UpdateUserDto, User>();
        }
    }
}
