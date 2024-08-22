using infotrackbe.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace infotrackbe.Services
{
    public interface IHistoryService
    {
        Task<IEnumerable<History>> GetAllHistoriesAsync();
        Task<History> GetHistoryByIdAsync(Guid id);
        Task AddHistoryAsync(History history);
    }
}
