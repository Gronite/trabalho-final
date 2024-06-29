using Backend.Domain.Entities;

namespace Backend.Application.Interfaces
{
    public interface IUsuarioService
    {
        IEnumerable<Usuario> GetAllUsuarios();
        Usuario? GetUsuarioById(int id);
        void AddUsuario(Usuario usuario);
        void UpdateUsuario(Usuario usuario);
        void DeleteUsuario(int id);
    }
}
