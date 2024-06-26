using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using System.Collections.Generic;

namespace Backend.Application.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public IEnumerable<Usuario> GetAllUsuarios()
        {
            return _usuarioRepository.GetAll();
        }

        public Usuario? GetUsuarioById(int id)
        {
            return _usuarioRepository.GetById(id);
        }

        public void AddUsuario(Usuario usuario)
        {
            _usuarioRepository.Add(usuario);
        }

        public void UpdateUsuario(Usuario usuario)
        {
            _usuarioRepository.Update(usuario);
        }

        public void DeleteUsuario(int id)
        {
            _usuarioRepository.Delete(id);
        }
    }
}