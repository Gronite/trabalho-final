#nullable enable
using System.Collections.Generic;
namespace Backend.Domain.Entities
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Nome { get; set; } = default!;

    }
}