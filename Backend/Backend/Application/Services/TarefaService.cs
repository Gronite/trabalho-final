using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Services
{
    public class TarefaService : ITarefaService
    {
        private readonly ITarefaRepository _tarefaRepository;

        public TarefaService(ITarefaRepository tarefaRepository)
        {
            _tarefaRepository = tarefaRepository;
        }

        public IEnumerable<Tarefa> GetAllTarefas()
        {
            return _tarefaRepository.GetAll();
        }

        public Tarefa? GetTarefaById(int id)
        {
            return _tarefaRepository.GetById(id);
        }

        public void AddTarefa(Tarefa tarefa)
        {
            _tarefaRepository.Add(tarefa);
        }

        public void UpdateTarefa(Tarefa tarefa)
        {
            _tarefaRepository.Update(tarefa);
        }

        public void DeleteTarefa(int id)
        {
            _tarefaRepository.Delete(id);
        }
    }
}
