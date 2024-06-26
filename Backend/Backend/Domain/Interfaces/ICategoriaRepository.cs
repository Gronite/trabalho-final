using Backend.Domain.Entities;
using System.Collections.Generic;

namespace Backend.Domain.Interfaces
{
    public interface ICategoriaRepository
    {
        IEnumerable<Categoria> GetAll();
        Categoria? GetById(int id);
        void Add(Categoria categoria);
        void Update(Categoria categoria);
        void Delete(int id);
    }
}