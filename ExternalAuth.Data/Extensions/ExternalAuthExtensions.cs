using ExternalAuth.Data.Options;
using ExternalAuth.Data.Repositories;
using ExternalAuth.Data.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExternalAuth.Data.Extensions
{
    public static class ExternalAuthExtensions
    {
        // Rename this method to Add[ProjectName]
        public static IServiceCollection AddExternalAuth(this IServiceCollection services, Action<ExternalAuthOptions> options)
        {
            #region Build options
            var opt = new ExternalAuthOptions();
            options(opt);
            #endregion
            #region Register DbContext
            services
                .AddDbContext<ExternalAuthContext>(db_options =>
                {
                    db_options.UseSqlServer(opt.ConnectionString);
                })
                .AddIdentity<Entities.User, Entities.Role>()
                .AddEntityFrameworkStores<ExternalAuthContext>()
                .AddDefaultTokenProviders();
            #endregion
            #region Add Authentication
            services
                .AddAuthentication()
                .AddJwtBearer(jwt_options =>
                {
                    jwt_options.Audience = opt.JwtIssuerOptions.Audience;
                    jwt_options.ClaimsIssuer = opt.JwtIssuerOptions.Issuer;
                    jwt_options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = true,
                        ValidAudience = opt.JwtIssuerOptions.Audience,

                        ValidateIssuer = true,
                        ValidIssuer = opt.JwtIssuerOptions.Issuer,

                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new Func<SymmetricSecurityKey>(() =>
                        {
                            var key = opt.JwtIssuerOptions.Key;
                            var bytes = Encoding.UTF8.GetBytes(key);
                            var signing_key = new SymmetricSecurityKey(bytes);
                            return signing_key;
                        }).Invoke(),

                        ValidateLifetime = true
                    };
                    jwt_options.SaveToken = false;
                })
                .AddFacebook(fb_options => {
                    fb_options.AppId = opt.FacebookOptions.AppId;
                    fb_options.AppSecret = opt.FacebookOptions.AppSecret;
                })
                .AddMicrosoftAccount(ms_options => {
                    ms_options.ClientId = opt.MicrosoftOptions.ClientId;
                    ms_options.ClientSecret = opt.MicrosoftOptions.ClientSecret;
                })
                .AddGoogle(g_options => {
                    g_options.ClientId = opt.GoogleOptions.ClientId;
                    g_options.ClientSecret = opt.GoogleOptions.ClientSecret;
                })
                .AddTwitter(tw_options => {
                    tw_options.ConsumerKey = opt.TwitterOptions.ConsumerKey;
                    tw_options.ConsumerSecret = opt.TwitterOptions.ConsumerSecret;
                    tw_options.RetrieveUserDetails = true;
                });
            #endregion
            #region Add Authorization
            services.AddAuthorization(options =>
            {
            });
            #endregion

            services.AddDataProtection();

            #region Repositories - Services
            services
                // Repositories
                .AddScoped<IAccountRepository, AccountRepository>()
                .AddScoped<IRoleRepository, RoleRepository>()
                // Services
                .AddScoped<IAccountService, AccountService>()
                .AddScoped<IRoleService, RoleService>();
            #endregion

            services
                .Configure<JwtIssuerOptions>(jwt_options =>
                {
                    jwt_options.Audience = opt.JwtIssuerOptions.Audience;
                    jwt_options.Issuer = opt.JwtIssuerOptions.Issuer;
                    jwt_options.Key = opt.JwtIssuerOptions.Key;
                    jwt_options.Subject = opt.JwtIssuerOptions.Subject;
                    jwt_options.ValidFor = opt.JwtIssuerOptions.ValidFor;
                });

            return services;
        }
    }
}
