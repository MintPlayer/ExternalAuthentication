// Activate this directive if your instance of SQL server only supports
// primary keys with max length of 700 bytes.
//#define MaxKeyLength700Bytes

using ExternalAuth.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExternalAuth.Data
{
    /**
     * 
     * cd ExternalAuth.Web
     * dotnet ef migrations add AddIdentity --project ..\ExternalAuth.Data
     * dotnet ef database update --project ..\ExternalAuth.Data
     * 
     **/

    internal class ExternalAuthContext : IdentityDbContext<User, Role, Guid>
    {
        private readonly IConfiguration configuration;
        public ExternalAuthContext(IConfiguration configuration) : base()
        {
            this.configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("external-auth"), options => options.MigrationsAssembly("MintPlayer.Data"));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

#if MaxKeyLength700Bytes
            builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserLogin<Guid>>()
                .Property(ut => ut.LoginProvider)
                .HasMaxLength(50);
            builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserLogin<Guid>>()
                .Property(ut => ut.ProviderKey)
                .HasMaxLength(200);

            builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserToken<Guid>>()
                .Property(ut => ut.LoginProvider)
                .HasMaxLength(50);
            builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserToken<Guid>>()
                .Property(ut => ut.Name)
                .HasMaxLength(50);
#endif
        }
    }
}
