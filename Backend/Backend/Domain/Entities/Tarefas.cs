namespace Backend.Domain.Entities

{
    public class Tarefa
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public int CategoriaId { get; set; }
        public int UsuarioId { get; set; }
        public ICollection<Comentario>? Comentarios { get; set; }
    }

}
