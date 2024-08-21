using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace infotrackbe.Services
{
    public class HtmlParser
    {
        public List<string> GetKeywordPositions(string htmlContent, string url)
        {
            List<string> results = new List<string>();
            var divClassRegex = new Regex(@"<div\s+class=""yuRUbf"">.*?</div>", RegexOptions.Singleline | RegexOptions.IgnoreCase);
            var matchCollection = divClassRegex.Matches(htmlContent);
            var divKeywordRegex = new Regex(@"href="".*?"+url, RegexOptions.Singleline | RegexOptions.IgnoreCase);

            int pos = 1;
            foreach (Match match in matchCollection)
            {
                var divContent = match.Value;
                var matchKeyword = divKeywordRegex.Match(divContent);
                if (matchKeyword.Success)
                {
                    results.Add(pos.ToString());
                }
                pos++;
            }

            return results;
        }

        public List<string> GetKeywordDivs(string htmlContent, string url)
        {
            var results = new List<string>();
            var divClassRegex = new Regex(@"<div\s+class=""yuRUbf"">.*?</div>", RegexOptions.Singleline | RegexOptions.IgnoreCase);
            var matchCollection = divClassRegex.Matches(htmlContent);
            var divKeywordRegex = new Regex(@"href="".*?"+url, RegexOptions.Singleline | RegexOptions.IgnoreCase);

            foreach (Match match in matchCollection)
            {
                var divContent = match.Value;
                var matchKeyword = divKeywordRegex.Match(divContent);
                if (matchKeyword.Success)
                {
                    results.Add(divContent);
                }
            }

            return results;
        }
    }
}
