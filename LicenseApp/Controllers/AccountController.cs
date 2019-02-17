using LicenseApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LicenseApp.Controllers.Resourses;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LicenseApp.Controllers
{
    public class AccountController : Controller
    {

        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _autoMapper;
        private readonly ApplicationContext _context;
        private readonly IJWTGenerator _jwtgenerator;

        public AccountController(IJWTGenerator jWTGenerator, ApplicationContext context, IConfiguration configuration, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, SignInManager<User> signInManager , IMapper autoMapper )

        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _signInManager = signInManager;
            _autoMapper = autoMapper;
            _context = context;
            _jwtgenerator = jWTGenerator;
        }

        private async Task<bool> SeedRoles(List<string> RoleNames )
        {
            foreach (var RoleName in RoleNames)
            {
                var RoleExist = await _roleManager.RoleExistsAsync(RoleName);
                if (!RoleExist)
                {
                    var Role = new IdentityRole(RoleName);
                    var Res  = await _roleManager.CreateAsync(Role);
                    if (!Res.Succeeded)
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        private async Task<bool> CreateUser(User user, string password, string userRole)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
                return false;

            var adminAccount = await _userManager.FindByNameAsync(user.UserName);

            result = await _userManager.AddToRoleAsync(adminAccount, userRole);
            if (!result.Succeeded)
                return false;

            var userCaims = new List<Claim>
                {
                    new Claim("Email", user.Email),
                    new Claim("UserName", user.UserName),
                    new Claim("PhoneNumber", user.PhoneNumber)
                };
            result = await _userManager.AddClaimsAsync(adminAccount, userCaims);
            if (!result.Succeeded)
                return false;

            return true;
        }

        [HttpPost]
        [Route("/api/seedsartaccountdata")]
        public async Task<IActionResult> AccountDefoults()
        {
            ///// Заполняем роли
            var RoleNames = new List<string>();
            RoleNames.Add("Administrator");
            RoleNames.Add("Manager");
            RoleNames.Add("LicenseUser");
            var rolesCreated  = await SeedRoles(RoleNames);
            if (!rolesCreated)
            {
                return BadRequest("Roles not created ...");
            }


            ///// Создаем админа
           
            var AdminRoleName = "Administrator";
            var AdminAccountExist = false;
            var usersArray =  _userManager.Users.ToArray<User>();
            foreach (var user in usersArray)
            {
                AdminAccountExist = await _userManager.IsInRoleAsync(user, AdminRoleName);
                if (AdminAccountExist)
                {
                    return Ok("Exists alrady");
                }
            }

            if (!AdminAccountExist)
            {
                var defoultAdmin = new User
                {
                    Email = "defaultmail@org.com",
                    Organisation = "defoultOrganisation",
                    UserName = AdminRoleName,
                    PhoneNumber = "+80509999999"
                };
                var defaultAdminPassword = "Abc123!";
                var result = await CreateUser(defoultAdmin, defaultAdminPassword, AdminRoleName);

                if (result)
                    return Ok("Created... Login and change password");
                return BadRequest("Somthing wrong ... ");
            }
            return Ok();


        }

        [HttpPost]
        [Route("/api/login")]
        public async Task<IActionResult> Login([FromBody] LoginResource loginResourse)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //// первый вариант проверяем одним запросом но плохо не используем механизмы библиотеки 
            //// второй вариант последовательно  FindByEmailAsync,FindByNameAsync  и проверки результатов var currUser = await _userManager.FindByEmailAsync(loginResourse.login);
            var currUser = await _userManager.Users.Where(u => u.Email == loginResourse.login |
            u.UserName == loginResourse.login |
            u.PhoneNumber == loginResourse.login).FirstOrDefaultAsync();

            if (currUser == null)
            {
                return Unauthorized();
            }
                            
            var resoult = await _signInManager.PasswordSignInAsync(currUser, loginResourse.password, false, false);
            if (!resoult.Succeeded)
            {
                return Unauthorized();
            }

            var token = await _jwtgenerator.GenerateJwtToken(currUser);
            return Ok(token);
        }
    }
}
