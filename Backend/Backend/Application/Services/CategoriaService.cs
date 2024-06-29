using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaRepository _categoriaRepository;

        public CategoriaService(ICategoriaRepository categoriaRepository)
        {
            _categoriaRepository = categoriaRepository;
        }

        public IEnumerable<Categoria> GetAllCategorias()
        {
            return _categoriaRepository.GetAll();
        }

        public Categoria? GetCategoriaById(int id)
        {
            return _categoriaRepository.GetById(id);
        }

        public void AddCategoria(Categoria categoria)
        {
            _categoriaRepository.Add(categoria);
        }

        public void UpdateCategoria(Categoria categoria)
        {
            _categoriaRepository.Update(categoria);
        }

        public void DeleteCategoria(int id)
        {
            _categoriaRepository.Delete(id);
        }
    }
}
