using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using System.IO;
using backend.Services.LoggingService;

namespace backend
{
  public class Startup
  {
    public Startup(IConfiguration configuration, ILoggerFactory loggerFactory)
    {
      //string.Concat(Directory.GetCurrentDirectory().Replace("_xunit", ""),
      loggerFactory.ConfigureNLog( "../../../../backend/nlog.config");
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {      
      services.AddCors(options => options.AddPolicy("Cors", builder =>
      {
        builder
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
      }));
      var connection = @"Data Source=JABIHDESKTOP;Initial Catalog=Quizdb;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
      services.AddDbContext<QuizContext>(opt => { opt.UseSqlServer(connection); });
      services.AddDbContext<UserDbContext>(opt => { opt.UseSqlServer(connection); });

      services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<UserDbContext>();

      var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));

      services.AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      }).AddJwtBearer(cfg =>
      {
        cfg.RequireHttpsMetadata = false;
        cfg.SaveToken = true;
        cfg.TokenValidationParameters = new TokenValidationParameters()
        {
          IssuerSigningKey = signingKey,
          ValidateAudience = false,
          ValidateIssuer = false,
          ValidateLifetime = false,
          ValidateIssuerSigningKey = true
        };
      });
      services.AddSingleton<ILoggerManager, LoggerManager>();
      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseAuthentication();

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseCors("Cors");
      app.UseMvc();
      
    }
  }
}
