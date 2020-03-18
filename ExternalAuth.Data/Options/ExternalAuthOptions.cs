using Microsoft.AspNetCore.Authentication.Facebook;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.MicrosoftAccount;
using Microsoft.AspNetCore.Authentication.Twitter;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExternalAuth.Data.Options
{
    public class ExternalAuthOptions
    {
        internal ExternalAuthOptions()
        {
        }

        /// <summary>Connection string used for MintPlayer database.</summary>
        public string ConnectionString { get; set; }

        /// <summary>Parameters for generating a JWT token.</summary>
        public JwtIssuerOptions JwtIssuerOptions { get; set; }

        /// <summary>Options for the Facebook login</summary>
        public FacebookOptions FacebookOptions { get; set; }
        
        /// <summary>Options for the Microsoft login</summary>
        public MicrosoftAccountOptions MicrosoftOptions { get; set; }

        /// <summary>Options for the Google login</summary>
        public GoogleOptions GoogleOptions { get; set; }

        /// <summary>Options for the Twitter login</summary>
        public TwitterOptions TwitterOptions { get; set; }

    }
}
