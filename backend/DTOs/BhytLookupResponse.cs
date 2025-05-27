namespace backend.DTOs
{
    public class BhytLookupResponse
    {
        public bool Success { get; set; }
        public BhytInfo? Data { get; set; }
        public string? Message { get; set; }
    }
}
