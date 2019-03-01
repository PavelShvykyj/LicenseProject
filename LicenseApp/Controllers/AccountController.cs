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

        private async Task<IdentityResult> CreateUser(User user, string password, string userRole)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
                return result;

            var adminAccount = await _userManager.FindByNameAsync(user.UserName);

            result = await _userManager.AddToRoleAsync(adminAccount, userRole);
            if (!result.Succeeded)
                return result;

            var userCaims = new List<Claim>
                {
                    new Claim("Email", user.Email),
                    new Claim("UserName", user.UserName),
                    new Claim("PhoneNumber", user.PhoneNumber)
                };
            result = await _userManager.AddClaimsAsync(adminAccount, userCaims);
            if (!result.Succeeded)
                return result;

            return result;
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

                if (result.Succeeded)
                    return Ok("Created... Login and change password");
                return BadRequest(result.Errors);
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

        [HttpGet]
        [Route("/api/users")]
        public async Task<IActionResult> GetUsers()
        {
            var subquery = from ur in _context.UserRoles join r in _context.Roles on ur.RoleId equals r.Id select new { ur.UserId, r.Name };
            var query = from u  in _context.Users join or in subquery on u.Id equals or.UserId into rol
                        select new { u.Id, SignIn = new { u.UserName, u.Email, u.PhoneNumber }, Roles = rol.Select(rl => rl.Name) };

            var res = await query.ToListAsync();
            return Ok(res);
        }

        [HttpGet]
        [Route("/api/userexist/{contactField}/{contactValue}")]
        public async Task<IActionResult> UserExist(string contactField, string contactValue)
        {

            var UsersID = new List<string>();
            User user;

            if (contactField == "Email")
            {
                user =  await _userManager.FindByEmailAsync(contactValue);
                if (user != null)
                {
                    UsersID.Add(user.Id);
                }
            }
            else if (contactField == "UserName")
            {
                user = await _userManager.FindByNameAsync(contactValue);
                if (user != null)
                {
                    UsersID.Add(user.Id);
                }
                
            }
            else if (contactField == "Phone")
            {
                var query = _context.Users.Where(u =>  u.PhoneNumber == contactValue).Select(e => e.Id);
                UsersID = await query.ToListAsync();
            }
            else
            {
                return BadRequest("Unknown field name");
            }


            return Ok(UsersID);

        }

        [HttpPost]
        [Route("/api/updateuser/{userid}")]
        public async Task<IActionResult> UpdateUser(string userid, [FromBody] SignInResource UserData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userManager.FindByIdAsync(userid);
            if (user == null)
            {
                return NotFound();       
            }
            user.Email = UserData.SignIn.Email;
            user.UserName = UserData.SignIn.UserName;
            user.PhoneNumber = UserData.SignIn.PhoneNumber;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok(UserData);
        }

        [HttpPost]
        [Route("/api/updateuserroles/{userid}")]
        public async Task<IActionResult> UpdateUserRoles(string userid, [FromBody] ICollection<string> Roles)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(userid);

            if (user == null)
            {
                return NotFound();
            }

            var allRoles = await _roleManager.Roles.Select(r => r.Name).ToListAsync();

            foreach (var role in allRoles)
            {
                var inRole = await _userManager.IsInRoleAsync(user, role);
                if (inRole)
                {
                    var r = await _userManager.RemoveFromRoleAsync(user, role); 
                    if (!r.Succeeded)
                    {
                        return BadRequest(r.Errors);
                    }
                }
            }


            var result = await _userManager.AddToRolesAsync(user, Roles);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }


        [HttpPost]
        [Route("/api/signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInResource UserData) {

            

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                Email = UserData.SignIn.Email,
                UserName = UserData.SignIn.UserName,
                PhoneNumber = UserData.SignIn.PhoneNumber
            };
            
            var result = await CreateUser(user, UserData.Password, "Manager");

            if (result.Succeeded)
            {
                user = await _userManager.FindByEmailAsync(UserData.SignIn.Email);
                UserData.Id = user.Id;
                UserData.Roles.Add("Manager");
                return Ok(UserData);
            }
                
            return BadRequest(result.Errors);
            
        }

        [HttpPost]
        [Route("/api/deleteuser/{userid}")]
        public async Task<IActionResult> DeleteUser(string userid) {

            var user = await _userManager.FindByIdAsync(userid);
            if (user == null) {
                return NotFound();
            }
 
            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
                return Ok();

            return BadRequest(result.Errors);
        }
        



        }
    }
