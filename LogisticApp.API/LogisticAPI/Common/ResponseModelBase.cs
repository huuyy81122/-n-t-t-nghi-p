namespace Logistic.Common
{
    public class ResponseModelBase<T>
    {
        public string Message { get; set; }
        public string StatusCode {  get; set; } 
        public T Data { get; set; }
        public List<T> ListData { get; set; }
    }

    public class ResponseLogin
    {
        public string Message { get; set; }
        public string StatusCode { get; set; }
        public string Token { get; set; }
    }
}
