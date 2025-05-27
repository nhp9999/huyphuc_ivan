using backend.Models;
using System.Security.Cryptography;
using System.Text;

namespace backend.Services
{
    public class UserService
    {
        // In-memory user storage for demo purposes
        private static readonly List<User> _users = new List<User>
        {
            new User
            {
                Id = "1",
                Username = "admin",
                Email = "admin@example.com",
                PasswordHash = HashPassword("password")
            },
            new User
            {
                Id = "2",
                Username = "user",
                Email = "user@example.com",
                PasswordHash = HashPassword("123456")
            }
        };

        public User? ValidateUser(string username, string password)
        {
            var user = _users.FirstOrDefault(u => u.Username == username);
            if (user == null)
                return null;

            if (VerifyPassword(password, user.PasswordHash))
                return user;

            return null;
        }

        public User? GetUserById(string id)
        {
            return _users.FirstOrDefault(u => u.Id == id);
        }

        public User? GetUserByUsername(string username)
        {
            return _users.FirstOrDefault(u => u.Username == username);
        }

        private static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private static bool VerifyPassword(string password, string hash)
        {
            var passwordHash = HashPassword(password);
            return passwordHash == hash;
        }
    }
}
