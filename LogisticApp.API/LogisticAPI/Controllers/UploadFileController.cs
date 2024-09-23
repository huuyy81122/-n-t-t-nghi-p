using Microsoft.AspNetCore.Mvc;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Logistic.Dtos;
using Logistic.Common;
using Logistic.Constants;
using Microsoft.AspNetCore.Authorization;

namespace Logistic.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class UploadFileController : ControllerBase
    {
        [HttpPost]
        public ResponseModelBase<string> UploadImage()
        {
            try
            {
                var account = new Account(
                "ddmdpbsoc",
                "511373236579179",
                "axduJCaEWhjcJSuHmR2ID_SsR7Q");

                var cloudinary = new CloudinaryDotNet.Cloudinary(account);

                var file = Request.Form.Files[0];

                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, file.OpenReadStream()),
                    Folder = "SellingCourses",
                };

                var uploadResult = cloudinary.Upload(uploadParams);

                string imageUrl = uploadResult.Uri.ToString();

                return new ResponseModelBase<string>
                {
                    Data = imageUrl,
                    Message = "Thành công",
                    StatusCode = StatusCodeApp.Success
                };
            }
            catch (Exception ex)
            {
                return new ResponseModelBase<string>
                {
                    Data = null,
                    Message = ex.Message,
                    StatusCode = StatusCodeApp.InternalServer
                };
            }
        }
    }
}
