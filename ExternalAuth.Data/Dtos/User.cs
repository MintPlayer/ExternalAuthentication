﻿using System;

namespace ExternalAuth.Data.Dtos
{
	public class User
	{
		public Guid Id { get; set; }
		public string UserName { get; set; }
		public string Email { get; set; }
		public string PictureUrl { get; set; }
	}
}
