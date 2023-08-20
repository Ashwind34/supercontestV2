using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using supercontestV2.Data;
using supercontestV2.Models;

namespace supercontestV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private UserManager<ApplicationUser> _userManager;

        public SettingsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Settings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppSettings>>> GetAppSettings()
        {
          if (_context.AppSettings == null)
          {
              return NotFound();
          }
            return await _context.AppSettings.ToListAsync();
        }

        // GET: api/Settings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AppSettings>> GetAppSettings(int id)
        {
          if (_context.AppSettings == null)
          {
              return NotFound();
          }
            var appSettings = await _context.AppSettings.FindAsync(id);

            if (appSettings == null)
            {
                return NotFound();
            }

            return appSettings;
        }

        // PUT: api/Settings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppSettings(int id, AppSettings appSettings)
        {
            if (id != appSettings.Id)
            {
                return BadRequest();
            }

            _context.Entry(appSettings).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppSettingsExists(id))
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

        // POST: api/Settings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AppSettings>> PostAppSettings(AppSettings appSettings)
        {
          if (_context.AppSettings == null)
          {
              return Problem("Entity set 'ApplicationDbContext.AppSettings'  is null.");
          }
            _context.AppSettings.Add(appSettings);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppSettings", new { id = appSettings.Id }, appSettings);
        }

        // DELETE: api/Settings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppSettings(int id)
        {
            if (_context.AppSettings == null)
            {
                return NotFound();
            }
            var appSettings = await _context.AppSettings.FindAsync(id);
            if (appSettings == null)
            {
                return NotFound();
            }

            _context.AppSettings.Remove(appSettings);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppSettingsExists(int id)
        {
            return (_context.AppSettings?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("isAdmin/{uid}")]
        public async Task<ActionResult<bool>> isUserAdmin(string uid)
        {
            var user = await _userManager.FindByIdAsync(uid);
            return await _userManager.IsInRoleAsync(user, "Admin");
            
        }

    }
}
