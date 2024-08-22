using System.Collections.Generic;
using System.Threading.Tasks;

namespace infotrackbe.Services.Interfaces
{
    public interface IScraper
    {
        Task<string> ScrapeResults(string keyword, string searchEngine);
        List<string> GetKeywordPositions(string htmlContent, string keyword, string searchEngine);
        bool CheckCookiesBlock(string htmlContent);
       
    }
}
