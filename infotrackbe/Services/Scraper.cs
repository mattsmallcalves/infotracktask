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

        public async Task<string> ScrapeResults(string keyword, string searchEngine)
        {
            var url = BuildSearchUrl(keyword, searchEngine);
            _httpClient.DefaultRequestHeaders.TryAddWithoutValidation(" ",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36");
            _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept",
                "*/*");
            _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept-Language",
                "en-US,en;q=0.9");
                _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Set-Cookie",
                "CONSENT=PENDING+944");

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
                    return $"https://www.bing.com//search?q={Uri.EscapeDataString(keyword)}";
                default:
                    throw new ArgumentException("Unsupported search engine.");
            }
        }

        public List<string> GetKeywordPositions(string htmlContent, string keyword, string searchEngine)
        {
            return _htmlParser.GetKeywordPositions(htmlContent, keyword, searchEngine);
        }
          public bool CheckCookiesBlock(string htmlContent)
        {
            return _htmlParser.CheckCookiesBlock(htmlContent);
        }
      
    }
}
