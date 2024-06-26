using Backend.Domain.Entities;
using System.Collections.Generic;

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