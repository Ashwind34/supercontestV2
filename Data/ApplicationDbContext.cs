using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using supercontestV2.Models;

namespace supercontestV2.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {
        }
        public virtual DbSet<UserPick> UserPicks { get; set; }
        public virtual DbSet<Game> Schedule { get; set; }

        public virtual DbSet<AppSettings> AppSettings { get; set; }


    }
}