using infotrackbe.Domain.Interfaces;
using infotrackbe.Infrastructure.Repositories;
using System.Threading.Tasks;

namespace infotrackbe.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private IHistoryRepository _historyRepository;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public IHistoryRepository HistoryRepository 
            => _historyRepository ??= new HistoryRepository(_context);

        public async Task<int> CommitAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
