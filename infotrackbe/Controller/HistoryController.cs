using infotrackbe.Services;
using infotrackbe.Domain.Entities;
using infotrackbe.Models.Request;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace infotrackbe.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryService _historyService;

        public HistoryController(IHistoryService historyService)
        {
            _historyService = historyService;
        }

        [HttpGet]
        public async Task<IEnumerable<History>> Get()
        {
            return await _historyService.GetAllHistoriesAsync();
        }

        

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] HistoryRequestModel model)
        {
            var history = new History
            {
                Id = Guid.NewGuid(),
                Keyword = model.Keyword,
                Url = model.Url,
                SearchEngine = model.SearchEngine,
                Positions = model.Positions,
                Display = model.Display,
                CreatedDate = DateTime.UtcNow
            };

            await _historyService.AddHistoryAsync(history);
            return CreatedAtAction(nameof(Get), new { id = history.Id }, history);
        }
    }
}
