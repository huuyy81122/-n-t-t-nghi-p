using System.Net.Mail;
using System.Net;

namespace Logistic.Common
{
    public class MailUtils
    {
        private readonly IConfiguration _configuration;
        public MailUtils(IConfiguration configuration) 
        {
            _configuration = configuration;
        }
        public void SendEmail(string _to, string _subject, string _body)
        {
            using (var smtpClient = new SmtpClient(_configuration["MailSettings:Hosting"]))
            {
                // Set the SMTP server, port, and credentials
                smtpClient.Port = 587;
                smtpClient.Credentials = new NetworkCredential(_configuration["MailSettings:SendFrom"], _configuration["MailSettings:Password"]);
                smtpClient.EnableSsl = true;

                // Create a MailMessage object
                var message = new MailMessage
                {
                    From = new MailAddress(_configuration["MailSettings:SendFrom"], "Hệ thống khóa học Uniedu"),
                    Subject = _subject,
                    Body = _body,
                    IsBodyHtml = true
                };

                // Add recipient(s)
                message.To.Add(_to);

                smtpClient.Send(message);
            }

        }
    }
}
