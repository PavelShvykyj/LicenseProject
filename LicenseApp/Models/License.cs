using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LicenseApp.Models
{
    public class License
    {
        
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Expired { get; set; }
        public byte Quontity { get; set; }
        public bool DemoMode { get; set; }
        public byte DataLifeDurationInDemo { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
    }



}

