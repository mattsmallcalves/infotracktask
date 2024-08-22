using infotrackbe.Domain.Entities;
using infotrackbe.Domain.Interfaces;
using infotrackbe.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace infotrackbe.Services
{
    public class HistoryService : IHistoryService
    {
        private readonly IUnitOfWork _unitOfWork;

        public HistoryService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<History>> GetAllHistoriesAsync()
        {
            return await _unitOfWork.HistoryRepository.GetAllHistoriesAsync();
        }

        public async Task AddHistoryAsync(History history)
        {
            await _unitOfWork.HistoryRepository.AddHistoryAsync(history);
            await _unitOfWork.CommitAsync();
        }
    }
}
