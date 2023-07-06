using Microsoft.AspNetCore.Identity;
using supercontestV2.Constants;

namespace supercontestV2.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName {  get; set; }
        public string LastName { get; set; }  
        public Team FavTeam { get; set; }

    }
}