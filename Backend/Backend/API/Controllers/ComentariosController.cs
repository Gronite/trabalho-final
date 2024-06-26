using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentariosController : ControllerBase
    {
        private readonly IComentarioService _comentarioService;

        public ComentariosController(IComentarioService comentarioService)
        {
            _comentarioService = comentarioService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Comentario>> GetComentarios()
        {
            return Ok(_comentarioService.GetAllComentarios());
        }

        [HttpGet("{id}")]
        public ActionResult<Comentario> GetComentario(int id)
        {
            var comentario = _comentarioService.GetComentarioById(id);
            if (comentario == null)
            {
                return NotFound();
            }
            return Ok(comentario);
        }

        [HttpPost]
        public IActionResult PostComentario([FromBody] Comentario comentario)
        {
            _comentarioService.AddComentario(comentario);
            return CreatedAtAction(nameof(GetComentario), new { id = comentario.Id }, comentario);
        }

        [HttpPut("{id}")]
        public IActionResult PutComentario(int id, [FromBody] Comentario comentario)
        {
            if (id != comentario.Id)
            {
                return BadRequest();
            }

            _comentarioService.UpdateComentario(comentario);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteComentario(int id)
        {
            _comentarioService.DeleteComentario(id);
            return NoContent();
        }
    }
}