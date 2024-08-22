using infotrackbe.Domain.Entities;
using infotrackbe.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace infotrackbe.Infrastructure.Repositories
{
    public class HistoryRepository : IHistoryRepository
    {
        private readonly ApplicationDbContext _context;

        public HistoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<History>> GetAllHistoriesAsync()
        {
            return await _context.Histories.ToListAsync();
        }

        public async Task<History> GetHistoryByIdAsync(Guid id)
        {
            return await _context.Histories.FindAsync(id);
        }

        public async Task AddHistoryAsync(History history)
        {
            await _context.Histories.AddAsync(history);
            await _context.SaveChangesAsync();
        }
    }
}
