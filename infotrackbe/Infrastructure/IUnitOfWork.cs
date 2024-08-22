using System;
using System.Threading.Tasks;
using infotrackbe.Domain.Interfaces;

namespace infotrackbe.Infrastructure
{
    public interface IUnitOfWork : IDisposable
    {
        IHistoryRepository HistoryRepository { get; }
        Task<int> CommitAsync();
    }
}
