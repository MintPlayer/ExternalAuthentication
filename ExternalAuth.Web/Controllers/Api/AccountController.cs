﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExternalAuth.Data.Dtos;
using ExternalAuth.Data.Exceptions.Account;
using ExternalAuth.Data.Services;
using ExternalAuth.Web.ViewModels.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExternalAuth.Web.Controllers.Api
{
	[ApiController]
	[Route("api/[controller]")]
	public class AccountController : Controller
	{
		private IAccountService accountService;
		public AccountController(IAccountService accountService)
		{
			this.accountService = accountService;
		}

		// POST: api/Account/register
		[HttpPost("register", Name = "api-account-register")]
		public async Task<ActionResult> Register([FromBody]UserDataVM userCreateVM)
		{
			try
			{
				await accountService.Register(userCreateVM.User, userCreateVM.Password);
				return Ok();
			}
			catch (RegistrationException registrationEx)
			{
				return BadRequest(registrationEx.Errors.Select(e => e.Description));
			}
			catch (Exception ex)
			{
				return StatusCode(500);
			}
		}

		// POST: api/Account/login
		[HttpPost("login", Name = "api-account-login")]
		public async Task<ActionResult<LoginResult>> Login([FromBody]LoginVM loginVM)
		{
			try
			{
				var login_result = await accountService.LocalLogin(loginVM.Email, loginVM.Password, false);
				return Ok(login_result);
			}
			catch (LoginException loginEx)
			{
				return Unauthorized();
			}
			catch (Exception ex)
			{
				return StatusCode(500);
			}
		}

		// GET: api/Account/current-user
		[Authorize(AuthenticationSchemes = "Bearer")]
		[HttpGet("current-user", Name = "api-account-currentuser")]
		public async Task<ActionResult<User>> GetCurrentUser()
		{
			var user = await accountService.GetCurrentUser(User);
			return Ok(user);
		}
	}
}