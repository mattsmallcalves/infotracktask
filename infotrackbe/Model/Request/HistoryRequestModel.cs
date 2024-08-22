namespace infotrackbe.Models.Request
{
    public class HistoryRequestModel
    {
        public string Keyword { get; set; }
        public string Url { get; set; }
        public string SearchEngine { get; set; }
        public string Positions { get; set; }
        public int? Display { get; set; }
    }
}
