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
        public async Task<IActionResult>  Scrap([FromBody] ScrapRequestModel  scrapRequestModel)
        {
            DateTime dateTime = DateTime.UtcNow.Date;
            ScrapJsonModel scrapJsonModel = new ScrapJsonModel();
            JsonReturnModel jsonResult = new JsonReturnModel();
             scrapJsonModel.positions = [];
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try{
                var htmlContent = await _scraper.ScrapeResults(scrapRequestModel.Keyword, scrapRequestModel.SearchEngine);
                var cookie = _scraper.CheckCookiesBlock(htmlContent);
                if(!cookie){
                    var positions = _scraper.GetKeywordPositions(htmlContent, scrapRequestModel.URL,scrapRequestModel.SearchEngine);
                  var history = new History
                    {
                       Id = Guid.NewGuid(),
                       Keyword = scrapRequestModel.Keyword,
                      Url = scrapRequestModel.URL,
                     SearchEngine = scrapRequestModel.SearchEngine,
                     Positions = string.Join( ",", positions.ToArray() ),
                     Display = 0,
                      CreatedDate = DateTime.UtcNow
                   };

                  await _historyService.AddHistoryAsync(history);
                  scrapJsonModel.positions = positions;
                }
              
                jsonResult.Result = "Success";
                jsonResult.Content = !cookie ?"Searching process was successful": "Cannot get data due to cookies restriction from Google";
                jsonResult.CreatedDate = dateTime.ToString("yyyyMMddHHmmss");
                scrapJsonModel.jsonReturnModel = jsonResult;
                
                return Content(JsonConvert.SerializeObject(scrapJsonModel), "application/json");
                }
            catch(Exception ex){
               _logger.LogError(ex.Message);
                jsonResult.Result = "Failed";
                jsonResult.Content = ex.Message;
                jsonResult.CreatedDate = dateTime.ToString("yyyyMMddHHmmss");
                scrapJsonModel.jsonReturnModel = jsonResult;
                scrapJsonModel.positions = [];
                return Content(JsonConvert.SerializeObject(scrapJsonModel), "application/json");
                
            }
      
   
        }

  

    }     
}
