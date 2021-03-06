﻿using System;

namespace ExternalAuth.Data.Exceptions.Account
{
	public class LoginException : Exception
	{
		public LoginException() : base("Could not login")
		{
		}
		public LoginException(Exception inner) : base("Could not login", inner)
		{
		}
	}
}
