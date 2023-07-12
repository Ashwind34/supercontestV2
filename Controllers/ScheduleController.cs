using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Z.BulkOperations;
using supercontestV2.Data;
using supercontestV2.Models;

namespace supercontestV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScheduleController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Schedule
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetSchedule()
        {
          if (_context.Schedule == null)
          {
              return NotFound();
          }
            return await _context.Schedule.ToListAsync();
        }

        // GET: api/Schedule/5
        [HttpGet("{week}")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames(int week)
        {
          if (_context.Schedule == null)
          {
              return NotFound();
          }
            var games = await _context.Schedule.Where(game => game.Week == week).ToListAsync();


            if (games == null)
            {
                return NotFound();
            }

            return games;
        }

        // PUT: api/Schedule/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(int id, Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
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

        [HttpPut("bulk")]
        public async Task<IActionResult> PutGames(List<Game> games)
        {

            try
            {
                await _context.Schedule.BulkMergeAsync(games);
            }
            catch(Exception error)
            {
                throw error;  
            }

            return NoContent();
        }

        // POST: api/Schedule
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Game>> PostGame(Game game)
        {
          if (_context.Schedule == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Schedule'  is null.");
          }
            _context.Schedule.Add(game);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGame", new { id = game.Id }, game);
        }

        // DELETE: api/Schedule/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            if (_context.Schedule == null)
            {
                return NotFound();
            }
            var game = await _context.Schedule.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.Schedule.Remove(game);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GameExists(int id)
        {
            return (_context.Schedule?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
