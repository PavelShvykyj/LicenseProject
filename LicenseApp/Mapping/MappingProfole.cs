using AutoMapper;
using LicenseApp.Controllers.DTO;
using LicenseApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LicenseApp.Mapping
{
    public class MappingProfole : Profile
    {
        public MappingProfole()
        {
            CreateMap<LicenseDTO, License>()
                .ForMember(L => L.Id, opt => opt.Ignore());
            CreateMap<License, LicenseDTO>();
            CreateMap<LicenseUpdateDTO, License>()
                .ForMember(L => L.Id, opt => opt.Ignore());
            CreateMap<License, LicenseUpdateDTO>();
        }
    }
}
