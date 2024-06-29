using Backend.Domain.Entities;

namespace Backend.Application.Interfaces
{
    public interface IComentarioService
    {
        IEnumerable<Comentario> GetAllComentarios();
        Comentario? GetComentarioById(int id);
        void AddComentario(Comentario comentario);
        void UpdateComentario(Comentario comentario);
        void DeleteComentario(int id);
    }
}
