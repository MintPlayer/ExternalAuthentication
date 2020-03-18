namespace ExternalAuth.Web.ViewModels.Account
{
    public class UserDataVM
    {
        public Data.Dtos.User User { get; set; }
        public string Password { get; set; }
        public string PasswordConfirmation { get; set; }
    }
}
