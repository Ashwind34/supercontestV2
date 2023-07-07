using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using supercontestV2.Data;
using supercontestV2.Models;

namespace supercontestV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPicksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserPicksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserPicks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserPick>>> GetUserPicks()
        {
          if (_context.UserPicks == null)
          {
              return NotFound();
          }
            return await _context.UserPicks.ToListAsync();
        }

        // GET: api/UserPicks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserPick>> GetUserPick(int? id)
        {
          if (_context.UserPicks == null)
          {
              return NotFound();
          }
            var userPick = await _context.UserPicks.FindAsync(id);

            if (userPick == null)
            {
                return NotFound();
            }

            return userPick;
        }

        // PUT: api/UserPicks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserPick(int? id, UserPick userPick)
        {
            if (id != userPick.Id)
            {
                return BadRequest();
            }

            _context.Entry(userPick).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserPickExists(id))
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

        // POST: api/UserPicks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserPick>> PostUserPick(UserPick userPick)
        {
          if (_context.UserPicks == null)
          {
              return Problem("Entity set 'ApplicationDbContext.UserPicks'  is null.");
          }
            _context.UserPicks.Add(userPick);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserPick", new { id = userPick.Id }, userPick);
        }

        // DELETE: api/UserPicks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserPick(int? id)
        {
            if (_context.UserPicks == null)
            {
                return NotFound();
            }
            var userPick = await _context.UserPicks.FindAsync(id);
            if (userPick == null)
            {
                return NotFound();
            }

            _context.UserPicks.Remove(userPick);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserPickExists(int? id)
        {
            return (_context.UserPicks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
