
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace LicenseApp.Models
{
    public class User : IdentityUser
    {
        public User()
            :base()
        {
            Licenses = new List<License>();
        }

        public List<License> Licenses { get; set; }
        public string Organisation { get; set; }
    }
}
