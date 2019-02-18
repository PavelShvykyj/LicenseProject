using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LicenseApp.Controllers.Resourses
{
    public class SignIn
    {
        [Required]
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PersonName { get; set; }
        public string Organization { get; set; }
    }
}
