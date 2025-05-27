using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class BhytLookupRequest
    {
        [Required(ErrorMessage = "Mã số BHXH là bắt buộc")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Mã số BHXH phải có đúng 10 chữ số")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Mã số BHXH chỉ được chứa số")]
        public string MaSoBHXH { get; set; } = string.Empty;
    }
}
