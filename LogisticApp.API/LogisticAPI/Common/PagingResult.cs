namespace Logistic.Common
{
    public class PagingResult<T>
    {
        public IEnumerable<T> Items { get; set; }

        public List<T> Results { get; set; }

        public decimal TotalItems { get; set; }
    }
}
