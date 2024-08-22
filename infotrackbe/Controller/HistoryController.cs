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
    }
}
