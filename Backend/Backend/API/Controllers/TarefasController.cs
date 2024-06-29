using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        private readonly ITarefaService _tarefaService;

        public TarefasController(ITarefaService tarefaService)
        {
            _tarefaService = tarefaService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Tarefa>> GetTarefas()
        {
            return Ok(_tarefaService.GetAllTarefas());
        }

        [HttpGet("{id}")]
        public ActionResult<Tarefa> GetTarefa(int id)
        {
            var tarefa = _tarefaService.GetTarefaById(id);
            if (tarefa == null)
            {
                return NotFound();
            }
            return Ok(tarefa);
        }

        [HttpGet("{id}/Comentarios")]
        public ActionResult<IEnumerable<Comentario>> GetComentariosPorTarefa(int id)
        {
            var tarefa = _tarefaService.GetTarefaById(id);
            if (tarefa == null)
            {
                return NotFound();
            }
            return Ok(tarefa.Comentarios);
        }

        [HttpPost]
        public IActionResult PostTarefa([FromBody] Tarefa tarefa)
        {
            _tarefaService.AddTarefa(tarefa);
            return CreatedAtAction(nameof(GetTarefa), new { id = tarefa.Id }, tarefa);
        }

        [HttpPut("{id}")]
        public IActionResult PutTarefa(int id, [FromBody] Tarefa tarefa)
        {
            if (id != tarefa.Id)
            {
                return BadRequest();
            }

            _tarefaService.UpdateTarefa(tarefa);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTarefa(int id)
        {
            _tarefaService.DeleteTarefa(id);
            return NoContent();
        }
    }
}
