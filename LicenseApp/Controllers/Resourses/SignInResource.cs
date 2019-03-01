
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace LicenseApp.Controllers.Resourses
{
    public class SignInResource
    {
        
        public string Id { get; set; }
        [Required]
        public SignIn SignIn  { get; set; }
        [Required]
        public ICollection<string> Roles { get; set; }
        public string Password { get; set; }

    }
}
