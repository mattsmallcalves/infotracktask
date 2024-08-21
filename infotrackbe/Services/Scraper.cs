using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using infotrackbe.Services.Interfaces;

namespace infotrackbe.Services
{
    public class Scraper : IScraper
    {
        private readonly HttpClient _httpClient;
        private readonly HtmlParser _htmlParser;

        public Scraper(HttpClient httpClient, HtmlParser htmlParser)
        {
            _httpClient = httpClient;
            _htmlParser = htmlParser;
        }

        public async Task<string> ScrapeGoogleResults(string keyword, string searchEngine)
        {
            var url = BuildSearchUrl(keyword, searchEngine);
            _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36");
            _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept",
                "*/*");
            _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept-Language",
                "en-US,en;q=0.9");

            var response = await _httpClient.GetStringAsync(url);
            return response;
        }

        private string BuildSearchUrl(string keyword, string searchEngine)
        {
            switch (searchEngine)
            {
                case "Google":
                    return $"https://www.google.co.uk/search?num=100&q={Uri.EscapeDataString(keyword)}";
                case "Bing":
                    
                    throw new NotImplementedException("Bing search is not implemented yet.");
                default:
                    throw new ArgumentException("Unsupported search engine.");
            }
        }

        public List<string> GetKeywordPositions(string htmlContent, string keyword)
        {
            return _htmlParser.GetKeywordPositions(htmlContent, keyword);
        }

        public List<string> GetKeywordDivs(string htmlContent, string keyword)
        {
            return _htmlParser.GetKeywordDivs(htmlContent, keyword);
        }
    }
}
