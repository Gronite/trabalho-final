using Backend.Domain.Entities;

namespace Backend.Domain.Interfaces
{
    public interface ITarefaRepository
    {
        IEnumerable<Tarefa> GetAll();
        Tarefa? GetById(int id);
        void Add(Tarefa tarefa);
        void Update(Tarefa tarefa);
        void Delete(int id);
    }
}
