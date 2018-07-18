using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    public class Credentials {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : Controller
    {
        readonly UserManager<IdentityUser> userManager;
        readonly SignInManager<IdentityUser> signInManager;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Credentials credentials)
        {
            var user = new IdentityUser { UserName = credentials.Email, Email = credentials.Email };
            var result = await userManager.CreateAsync(user, credentials.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await signInManager.SignInAsync(user, isPersistent: false);

            var token = CreateToken(user);
            
            return Ok(token);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Credentials credentials)
        {
            var result = await signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, false, false);
            if (!result.Succeeded)
            {
                IdentityError error = new IdentityError() { Code = "Invalid Credentails", Description = "Please make sure your credentials is correct." };
                var errors = new List<IdentityError>
                {
                  error
                };
                return BadRequest(errors);
            }

            var user = await userManager.FindByEmailAsync(credentials.Email);

            return Ok(CreateToken(user));
        }

    [HttpPost("delete")]
    public async Task<IActionResult> Delete([FromBody] Credentials credentials)
    {
        IdentityError error = null;
        var userToDelete = userManager.Users.SingleOrDefault(user => user.Email.Equals(credentials.Email));
        if (userToDelete != null)
        {
            if (await userManager.CheckPasswordAsync(userToDelete, credentials.Password))
            {
                var result = await userManager.DeleteAsync(userToDelete);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
            }
            else
            {
                error = new IdentityError() { Code = "Invalid Credentails", Description = "Please make sure your credentials is correct." };
            }
        }
        else
        {
          error = new IdentityError() { Code = "Not Found", Description = "Username not exist." };
        }

        if(error != null) return BadRequest(error);

        return Ok();
    }

        private string CreateToken(IdentityUser user)
        {
            var claims = new Claim[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
