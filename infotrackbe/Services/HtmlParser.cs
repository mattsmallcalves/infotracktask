using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace infotrackbe.Services
{
    public class HtmlParser
    {
        public List<string> GetKeywordPositions(string htmlContent, string url, string searchEngine)
        {
            List<string> results = new List<string>();
            var regexList = BuildRegex(searchEngine, url);
            
            var matchCollection = regexList[0].Matches(htmlContent); 
            int pos = 0;
            foreach (Match match in matchCollection)
            {
                var divContent = match.Value;
                var matchKeyword = regexList[1].Match(divContent);
                if (matchKeyword.Success)
                {
                    results.Add(pos.ToString());
                }
                pos++;
            }

            return results;
        }
        public bool CheckCookiesBlock(string htmlContent)
        {
            List<string> results = new List<string>();
             var cookieRegex = new Regex(@"<h1>\s*Before\s+you\s+continue\s+to\s+Google\s*<\/h1>", RegexOptions.Singleline | RegexOptions.IgnoreCase);
            var matchCookie = cookieRegex.Match(htmlContent); 
                if (matchCookie.Success)
                {
                   return true;
                }
                return false;
        }

        
        private List<Regex> BuildRegex(string searchEngine, string url)
        {
            switch (searchEngine)
            {
                case "Google":
                    var googleClassRegex = new Regex(@"<div\b[^>]*>.*?<h3\b[^>]*>.*?<\/h3>.*?<a\b[^>]*>.*?<\/a>.*?<\/div>", RegexOptions.Singleline | RegexOptions.IgnoreCase);
                    var googleKeywordRegex = new Regex(@""+url, RegexOptions.Singleline | RegexOptions.IgnoreCase);
                    return [googleClassRegex, googleKeywordRegex];
                case "Bing":
                    var bingClassRegex = new Regex(@"<div class=""b_tpcn"">.*?</div>", RegexOptions.Singleline | RegexOptions.IgnoreCase);
                    var bingKeywordRegex = new Regex(@"href="".*?"+url, RegexOptions.Singleline | RegexOptions.IgnoreCase);
                    return [bingClassRegex, bingKeywordRegex];
                default:
                    throw new ArgumentException("Unsupported search engine.");
            }
        }
       
    }
}
