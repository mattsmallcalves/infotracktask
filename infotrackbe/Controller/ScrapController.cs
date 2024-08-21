using System;
using System.Data;
using System.Text;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json;
using infotrackbe.Models;
using infotrackbe.Services;
using infotrackbe.Services.Interfaces;

namespace infotrackbe.Controllers
{
    [ApiController]
     [Route("/get")]
    public class ScrapController : ControllerBase
    {
        private readonly ILogger<ScrapController> _logger;
        private readonly IConfiguration _configuration;
        private readonly IScraper _scraper;
        private readonly HtmlParser _htmlParser;

        public ScrapController(ILogger<ScrapController> logger,  IConfiguration configuration, IScraper scraper, HtmlParser htmlParser)
        {
            _logger = logger;
            _configuration = configuration;
            _scraper = scraper;
            _htmlParser = htmlParser;
        }
 
        [HttpPost("scrap")]
        public async Task<IActionResult>  Scrap([FromBody] ScrapRequestModel  scrapRequestModel)
        {
            DateTime dateTime = DateTime.UtcNow.Date;
            ScrapJsonModel scrapJsonModel = new ScrapJsonModel();
            JsonReturnModel jsonResult = new JsonReturnModel();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try{
                var htmlContent = await _scraper.ScrapeGoogleResults(scrapRequestModel.Keyword, scrapRequestModel.SearchEngine);
                var positions = _scraper.GetKeywordPositions(htmlContent, scrapRequestModel.URL);
                jsonResult.Result = "Success";
                jsonResult.Content = "Searching process was successful";
                jsonResult.CreatedDate = dateTime.ToString("yyyyMMddHHmmss");
                scrapJsonModel.jsonReturnModel = jsonResult;
                scrapJsonModel.positions = positions;
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
         return Ok(JsonConvert.SerializeObject(jsonResult));
   
        }

  

    }     
}
