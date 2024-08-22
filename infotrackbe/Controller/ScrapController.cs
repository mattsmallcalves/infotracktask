using System;
using System.Data;
using System.Text;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Linq;
using infotrackbe.Domain.Entities;
using Newtonsoft.Json;
using infotrackbe.Models;
using infotrackbe.Services;
using infotrackbe.Services.Interfaces;

namespace infotrackbe.Controllers
{
    [ApiController]
     [Route("/[controller]")]
    public class ScrapController : ControllerBase
    {
        private readonly ILogger<ScrapController> _logger;
        private readonly IConfiguration _configuration;
        private readonly IScraper _scraper;
        private readonly HtmlParser _htmlParser;
        private readonly IHistoryService _historyService;
        public ScrapController(ILogger<ScrapController> logger,  IConfiguration configuration, IScraper scraper, HtmlParser htmlParser, IHistoryService historyService)
        {
            _logger = logger;
            _configuration = configuration;
            _scraper = scraper;
            _htmlParser = htmlParser;
            _historyService = historyService;
        }
 
       [HttpPost]
        public async Task<IActionResult> Scrap([FromBody] ScrapRequestModel scrapRequestModel)
        {
            return await HandleScraping(scrapRequestModel, display: 0);
        }

        [HttpPost("/automation")]
        public async Task<IActionResult> Automation([FromBody] ScrapRequestModel scrapRequestModel)
        {
            return await HandleScraping(scrapRequestModel, display: 1);
        }

        private async Task<IActionResult> HandleScraping(ScrapRequestModel scrapRequestModel, int display)
        {
            DateTime dateTime = DateTime.UtcNow.Date;
            ScrapJsonModel scrapJsonModel = new ScrapJsonModel();
            JsonReturnModel jsonResult = new JsonReturnModel();
            scrapJsonModel.positions = new List<string>();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var htmlContent = await _scraper.ScrapeResults(scrapRequestModel.Keyword, scrapRequestModel.SearchEngine);
                var cookieBlocked = _scraper.CheckCookiesBlock(htmlContent);

                if (!cookieBlocked)
                {
                    var positions = _scraper.GetKeywordPositions(htmlContent, scrapRequestModel.URL, scrapRequestModel.SearchEngine);
                    await SaveHistoryAsync(scrapRequestModel, positions, display);
                    scrapJsonModel.positions = positions;
                }

                jsonResult.Result = "Success";
                jsonResult.Content = cookieBlocked ? "Cannot get data due to cookies restriction from Google" : "Searching process was successful";
                jsonResult.CreatedDate = dateTime.ToString("yyyyMMddHHmmss");
                scrapJsonModel.jsonReturnModel = jsonResult;

                return Content(JsonConvert.SerializeObject(scrapJsonModel), "application/json");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                jsonResult.Result = "Failed";
                jsonResult.Content = ex.Message;
                jsonResult.CreatedDate = dateTime.ToString("yyyyMMddHHmmss");
                scrapJsonModel.jsonReturnModel = jsonResult;

                return Content(JsonConvert.SerializeObject(scrapJsonModel), "application/json");
            }
        }

        private async Task SaveHistoryAsync(ScrapRequestModel scrapRequestModel, List<string> positions, int display)
        {
            var history = new History
            {
                Id = Guid.NewGuid(),
                Keyword = scrapRequestModel.Keyword,
                Url = scrapRequestModel.URL,
                SearchEngine = scrapRequestModel.SearchEngine,
                Positions = string.Join(",", positions),
                Display = display,
                CreatedDate = DateTime.UtcNow
            };

            await _historyService.AddHistoryAsync(history);
        }
    }
}