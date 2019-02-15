using LicenseApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LicenseApp.Controllers
{
    public class JWTGenerator : IJWTGenerator
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public JWTGenerator(IConfiguration configuration , UserManager<User> userManager, RoleManager<IdentityRole> roleManager )

        {
            _userManager   = userManager;
            _roleManager   = roleManager;
            _configuration = configuration;

        }

        

        public async Task<string> GenerateJwtToken(User appUser)
        {

            var jwtsettings = _configuration.GetSection("jwtsettings");
            var claims = await _userManager.GetClaimsAsync(appUser);
            var userRoles = await _userManager.GetRolesAsync(appUser);

            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim("role", userRole));
            }


            var now = DateTime.UtcNow;
            var token = new JwtSecurityToken(issuer: jwtsettings.GetValue<string>("ISSUER"),
                                            audience: jwtsettings.GetValue<string>("AUDIENCE") ,
                                            claims: claims,
                                            expires: now.Add(TimeSpan.FromMinutes(jwtsettings.GetValue<int>("LIFETIME"))),
                                            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtsettings.GetValue<string>("KEY"))), SecurityAlgorithms.HmacSha256)

                                            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

    }
}
