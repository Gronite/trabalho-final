using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Infrastructure.Data;

namespace Backend.Infrastructure.Repositories
{
    public class ComentarioRepository : IComentarioRepository
    {
        private readonly ApplicationDbContext _context;

        public ComentarioRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Comentario> GetAll()
        {
            return _context.Comentarios.ToList();
        }

        public Comentario? GetById(int id)
        {
            return _context.Comentarios.Find(id);
        }

        public void Add(Comentario comentario)
        {
            _context.Comentarios.Add(comentario);
            _context.SaveChanges();
        }

        public void Update(Comentario comentario)
        {
            _context.Comentarios.Update(comentario);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var comentario = _context.Comentarios.Find(id);
            if (comentario != null)
            {
                _context.Comentarios.Remove(comentario);
                _context.SaveChanges();
            }
        }
    }
}
