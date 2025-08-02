using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PedidoAPI03.Models;

namespace PedidoAPI03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly BdPedidos03Context _context;

        public PedidoController(BdPedidos03Context context)
        {
            _context = context;
        }

        // GET: api/Pedido
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidos()
        {
            return await _context.Pedidos.ToListAsync();
        }

        // GET: api/Pedido/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pedido>> GetPedido(int id)
        {
            var pedido = await _context.Pedidos.FindAsync(id);

            if (pedido == null)
            {
                return NotFound();
            }

            return pedido;
        }

        // PUT: api/Pedido/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPedido(int id, Pedido pedido)
        {
            if (id != pedido.Idpedido)
            {
                return BadRequest();
            }

            _context.Entry(pedido).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PedidoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPut]
        public async Task<IActionResult> PutPedido(Pedido pedido)
        {
            _context.Entry(pedido).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PedidoExists(pedido.Idpedido))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Pedido
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Pedido>> PostPedido(Pedido pedido)
        {
            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPedido", new { id = pedido.Idpedido }, pedido);
        }

        // DELETE: api/Pedido/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePedido(int id)
        {
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido == null)
            {
                return NotFound();
            }

            _context.Pedidos.Remove(pedido);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("ComUsuario")]
        public async Task<ActionResult<IEnumerable<object>>> GetPedidosComUsuarios()
        {
            // Carrega todos os pedidos do banco de dados principal
            var pedidos = await _context.Pedidos.ToListAsync();

            // Carrega todos os usuários do banco de dados secundário
            var usuarios = await _context.Usuarios.ToListAsync();

            // Junta os dados dos pedidos com os dados dos usuários em memória
            var resultado = from pedido in pedidos
                            join usuario in usuarios on pedido.IdUsuario equals usuario.Idusuario
                            select new
                            {
                                PedidoId = pedido.Idpedido,
                                pedido.Datapedido,
                                pedido.Descricao,
                                pedido.Localidade,
                                pedido.Prioridade,
                                pedido.Statuspedido,
                                Usuarioid = usuario.Idusuario,
                                UsuarioNome = usuario.Nome,
                                UsuarioEmail = usuario.Email
                            };

            return Ok(resultado);
        }

        private bool PedidoExists(int id)
        {
            return _context.Pedidos.Any(e => e.Idpedido == id);
        }
    }
}
