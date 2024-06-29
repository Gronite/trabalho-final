using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Services
{
    public class ComentarioService : IComentarioService
    {
        private readonly IComentarioRepository _comentarioRepository;

        public ComentarioService(IComentarioRepository comentarioRepository)
        {
            _comentarioRepository = comentarioRepository;
        }

        public IEnumerable<Comentario> GetAllComentarios()
        {
            return _comentarioRepository.GetAll();
        }

        public Comentario? GetComentarioById(int id)
        {
            return _comentarioRepository.GetById(id);
        }

        public void AddComentario(Comentario comentario)
        {
            _comentarioRepository.Add(comentario);
        }

        public void UpdateComentario(Comentario comentario)
        {
            _comentarioRepository.Update(comentario);
        }

        public void DeleteComentario(int id)
        {
            _comentarioRepository.Delete(id);
        }
    }
}
