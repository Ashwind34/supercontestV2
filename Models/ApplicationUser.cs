﻿using Microsoft.AspNetCore.Identity;

namespace supercontestV2.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName {  get; set; }
        public string LastName { get; set; }  
        public string FavTeam { get; set; }

    }
}