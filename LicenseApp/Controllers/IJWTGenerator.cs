using System.Threading.Tasks;
using LicenseApp.Models;

namespace LicenseApp.Controllers
{
    public interface IJWTGenerator
    {
        Task<string> GenerateJwtToken(User appUser);
    }
}