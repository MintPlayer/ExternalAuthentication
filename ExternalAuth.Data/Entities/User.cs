using Microsoft.AspNetCore.Identity;
using System;

namespace ExternalAuth.Data.Entities
{
	internal class User : IdentityUser<Guid>
	{
		public string PictureUrl { get; set; }
	}
}
