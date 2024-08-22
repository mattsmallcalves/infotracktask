using infotrackbe.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace infotrackbe.Domain.Interfaces
{
    public interface IHistoryRepository
    {
        Task<IEnumerable<History>> GetAllHistoriesAsync();
        Task<History> GetHistoryByIdAsync(Guid id);
        Task AddHistoryAsync(History history);
    }
}
