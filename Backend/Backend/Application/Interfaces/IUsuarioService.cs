using Backend.Domain.Entities;
using System.Collections.Generic;

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