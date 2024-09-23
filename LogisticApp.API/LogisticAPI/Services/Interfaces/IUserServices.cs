using Logistic.Common;
using Logistic.Dtos.User;

namespace Logistic.Services.Interfaces
{
    public interface IUserServices
    {
        void Create(CreateUserDto input);
        string Login(LoginDto input);
        GetUserDto GetUserByEmail(string email);
        UpdateUserDto UpdateUserByEmail(UpdateUserDto input, string email);
        string ForgotPassword(string email);
        bool ChangePassword(ChangePasswordDto input);
        GetUserDto GetCurrentUser();
        List<GetUserDto> GetAllUser(int idRole, bool deXuat);
        GetUserDto GetUserById(int id);
        UpdateUserDto Update(UpdateUserDto input);
        ResponseModelBase<string> Delete(int id);
        ResponseModelBase<string> UpdateStatus(UpdateUserDto input);

    }
}
