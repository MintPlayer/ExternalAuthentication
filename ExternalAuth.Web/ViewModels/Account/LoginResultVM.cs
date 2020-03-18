namespace ExternalAuth.Web.ViewModels.Account
{
	public class LoginResultVM
	{
		public bool Status { get; set; }
		public string Medium { get; set; }
		public string Platform { get; set; }

		public Data.Dtos.User User { get; set; }

		public string Error { get; set; }
		public string ErrorDescription { get; set; }
	}
}
