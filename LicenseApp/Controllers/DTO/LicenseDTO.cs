using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LicenseApp.Controllers.DTO
{
    public class LicenseDTO
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime? Expired { get; set; }
        [Required]
        [Range(1, byte.MaxValue)]
        public byte Quontity { get; set; }
        [Required]
        public bool DemoMode { get; set; }
        [Required]
        [Range(1, byte.MaxValue)]
        public byte DataLifeDurationInDemo { get; set; }
        [Required]
        public string UserId { get; set; }

    }

    public class LicenseUpdateDTO
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime? Expired { get; set; }
        [Required]
        [Range(1, byte.MaxValue)]
        public byte Quontity { get; set; }
        [Required]
        public bool DemoMode { get; set; }
        [Required]
        [Range(1, byte.MaxValue)]
        public byte DataLifeDurationInDemo { get; set; }
        [Required]
        public string UserId { get; set; }
    }



}
