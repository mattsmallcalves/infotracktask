using System.Collections.Generic;
using System.Threading.Tasks;

namespace infotrackbe.Services.Interfaces
{
    public interface IScraper
    {
        Task<string> ScrapeGoogleResults(string keyword, string searchEngine);
        List<string> GetKeywordPositions(string htmlContent, string keyword);
        List<string> GetKeywordDivs(string htmlContent, string keyword);
    }
}
