using Backend.Domain.Entities;

namespace Backend.Domain.Interfaces
{
    public interface IComentarioRepository
    {
        IEnumerable<Comentario> GetAll();
        Comentario? GetById(int id);
        void Add(Comentario comentario);
        void Update(Comentario comentario);
        void Delete(int id);
    }
}
