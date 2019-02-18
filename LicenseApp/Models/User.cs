
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace LicenseApp.Models
{
    public class User : IdentityUser
    {
        public User()
            :base()
        {
            Licenses = new Collection<License>();
            
        }

        public ICollection<License> Licenses { get; set; }
        public string Organisation { get; set; }
        
    }
}
