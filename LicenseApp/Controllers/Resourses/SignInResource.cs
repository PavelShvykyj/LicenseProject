using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LicenseApp.Controllers.Resourses
{
    public class SignInResource
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public SignIn SignIn  { get; set; }
        [Required]
        public ICollection<string> Roles { get; set; }
    }
}
