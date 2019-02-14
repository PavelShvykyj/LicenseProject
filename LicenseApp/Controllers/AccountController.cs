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

        public AccountController(ApplicationContext context, IConfiguration configuration, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, SignInManager<User> signInManager , IMapper autoMapper )

        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _signInManager = signInManager;
            _autoMapper = autoMapper;
            _context = context;
        }


        [HttpPost]
        [Route("/api/seedsartaccountdata")]
        public async Task<IActionResult> AccountDefoults()
        {
            var AdminRoleName = "Administrator";
            var AdminRoleExist = await _roleManager.RoleExistsAsync(AdminRoleName);
            if (!AdminRoleExist)
            {
                var AdminRole = new IdentityRole(AdminRoleName);
                await _roleManager.CreateAsync(AdminRole);
            }
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

                await _userManager.CreateAsync(defoultAdmin, defaultAdminPassword);
                var adminAccount = await _userManager.FindByNameAsync(AdminRoleName);
                await _userManager.AddToRoleAsync(adminAccount, AdminRoleName);
            }
            
            return Ok("Created... Login and change password");
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
            //var currUser = await _userManager.Users.Where(u => u.Email == loginResourse.login |
            //u.UserName == loginResourse.login |
            //u.PhoneNumber == loginResourse.login).FirstOrDefaultAsync();                                                  

            var currUser = await _userManager.FindByEmailAsync(loginResourse.login);
            if (currUser == null)
            {
                currUser = await _userManager.FindByNameAsync(loginResourse.login);
                if (currUser == null)
                {
                    return Unauthorized();
                }
            }
                            
            var resoult = await _signInManager.PasswordSignInAsync(currUser, loginResourse.password, false, false);
            if (!resoult.Succeeded)
            {
                return Unauthorized();
            }

            var tokenGenerator = new JWTGenerator(_configuration,_userManager,_roleManager);
            var token = await tokenGenerator.GenerateJwtToken(currUser);
            return Ok(token);
        }
    }
}
