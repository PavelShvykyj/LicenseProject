
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace LicenseApp.Controllers.DTO
{
    public class SignInDTO
    {
        public string Id { get; set; }
        [Required]
        public ContactDTO Contact { get; set; }
        [Required]
        public ICollection<string> Roles { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class SignInUpdateDTO
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public ContactUserUpdateDTO Contact { get; set; }
        public string Password { get; set; }
    }

    public class SignInLicenseDTO
    {
        public string Id { get; set; }
        [Required]
        public ContactLicenseCreateDTO Contact { get; set; }
        [Required]
        public ICollection<string> Roles { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class SignInUpdateLicenseDTO
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public ContactLicenseUpdateDTO Contact { get; set; }
        public string Password { get; set; }
    }


}
