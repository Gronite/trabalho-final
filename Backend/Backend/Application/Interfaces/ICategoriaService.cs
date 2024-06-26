using Backend.Domain.Entities;
using System.Collections.Generic;

namespace Backend.Application.Interfaces
{
    public interface ICategoriaService
    {
        IEnumerable<Categoria> GetAllCategorias();
        Categoria? GetCategoriaById(int id);
        void AddCategoria(Categoria categoria);
        void UpdateCategoria(Categoria categoria);
        void DeleteCategoria(int id);
    }
}