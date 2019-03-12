

using System.ComponentModel.DataAnnotations;

namespace LicenseApp.Controllers.DTO
{
    public class LoginDTO
    {
        [Required]
        public string login { get; set; }
        [Required]
        public string password { get; set; }
    }
}
