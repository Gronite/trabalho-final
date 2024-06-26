#nullable enable
using System.Collections.Generic;

namespace Backend.Domain.Entities
{

    public class Comentario
    {
        public int Id { get; set; }
        public string Texto { get; set; } = string.Empty;
        public int TarefaId { get; set; }
        public int UsuarioId { get; set; }
    }

}