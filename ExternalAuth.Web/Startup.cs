using ExternalAuth.Data.Extensions;
using Microsoft.AspNetCore.Authentication.Facebook;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.MicrosoftAccount;
using Microsoft.AspNetCore.Authentication.Twitter;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

namespace ExternalAuth.Web
{
    public class Startup
    {
        /******************************************************************/
        /* Uncomment appsettings.*.json in the gitignore file to exclude  */
        /* the OAuth keys from source control                             */
        /******************************************************************/

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddExternalAuth(options =>
                {
                    options.ConnectionString = Configuration.GetConnectionString("external-auth");
                    options.JwtIssuerOptions = new Data.Options.JwtIssuerOptions
                    {
                        Issuer = Configuration["JwtIssuerOptions:Issuer"],
                        Audience = Configuration["JwtIssuerOptions:Audience"],
                        Subject = Configuration["JwtIssuerOptions:Subject"],
                        ValidFor = Configuration.GetValue<TimeSpan>("JwtIssuerOptions:ValidFor"),
                        Key = Configuration["JwtIssuerOptions:Key"],
                    };
                    options.FacebookOptions = new FacebookOptions
                    {
                        AppId = Configuration["FacebookOptions:AppId"],
                        AppSecret = Configuration["FacebookOptions:AppSecret"]
                    };
                    options.MicrosoftOptions = new MicrosoftAccountOptions
                    {
                        ClientId = Configuration["MicrosoftOptions:AppId"],
                        ClientSecret = Configuration["MicrosoftOptions:AppSecret"]
                    };
                    options.GoogleOptions = new GoogleOptions
                    {
                        ClientId = Configuration["GoogleOptions:AppId"],
                        ClientSecret = Configuration["GoogleOptions:AppSecret"]
                    };
                    options.TwitterOptions = new TwitterOptions
                    {
                        ConsumerKey = Configuration["TwitterOptions:ApiKey"],
                        ConsumerSecret = Configuration["TwitterOptions:ApiSecret"]
                    };
                })
                .AddControllersWithViews();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services
                .Configure<IdentityOptions>(options =>
                {
                    // Password settings
                    options.Password.RequireDigit = true;
                    options.Password.RequiredLength = 8;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = true;
                    options.Password.RequireLowercase = false;
                    options.Password.RequiredUniqueChars = 6;

                    // Lockout settings
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                    options.Lockout.MaxFailedAccessAttempts = 10;
                    options.Lockout.AllowedForNewUsers = true;

                    // User settings
                    options.User.RequireUniqueEmail = true;
                    options.User.AllowedUserNameCharacters = string.Empty;
                })
                .ConfigureApplicationCookie(options =>
                {
                    options.Events.OnRedirectToLogin = (context) =>
                    {
                        context.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
