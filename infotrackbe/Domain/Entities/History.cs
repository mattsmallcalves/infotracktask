namespace infotrackbe.Domain.Entities
{
    public class History
    {
        public Guid Id { get; set; }
        public string Keyword { get; set; }
        public string Url { get; set; }
        public string SearchEngine { get; set; }
        public string Positions { get; set; }
        public int? Display { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
