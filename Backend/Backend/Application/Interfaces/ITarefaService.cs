using Backend.Domain.Entities;
using System.Collections.Generic;

namespace Backend.Application.Interfaces
{
    public interface ITarefaService
    {
        IEnumerable<Tarefa> GetAllTarefas();
        Tarefa? GetTarefaById(int id);
        void AddTarefa(Tarefa tarefa);
        void UpdateTarefa(Tarefa tarefa);
        void DeleteTarefa(int id);
    }
}