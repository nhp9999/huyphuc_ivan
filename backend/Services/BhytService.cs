using System.Text.Json;
using backend.DTOs;

namespace backend.Services
{
    public class BhytService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<BhytService> _logger;
        private readonly string _vnpostApiUrl = "https://ssm.vnpost.vn/connect/tracuu/thongtinthe";
        private readonly string _bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiODg0MDAwX3hhX3RsaV9waHVvY2x0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoidXNlciIsInN1YiI6IjEwMDkxNyIsInNpZCI6ImNZMW50UDJMS1hhTnQ3MXptS0xxVlF4LURsSDJic0pXMFN0RlphTGdnV2ciLCJuYW1lIjoiTMOqIFRo4buLIFBoxrDhu5tjIiwibmlja25hbWUiOiI4ODQwMDBfeGFfdGxpX3BodW9jbHQiLCJjbGllbnRfaWQiOiJZamcyTldVd01XRXRORFZtWlMwME1UZGhMVGc1TTJNdE56ZGtabUUzTmpVNE56VXoiLCJtYW5nTHVvaSI6Ijc2MjU1IiwiZG9uVmlDb25nVGFjIjoixJBp4buDbSB0aHUgeMOjIFTDom4gTOG7o2kiLCJjaHVjRGFuaCI6IkPhu5luZyB0w6FjIHZpw6puIHRodSIsImVtYWlsIjoibmd1eWVudGFuZHVuZzI3MTE4OUBnbWFpbC5jb20iLCJzb0RpZW5UaG9haSI6IiIsImlzU3VwZXJBZG1pbiI6IkZhbHNlIiwiaXNDYXMiOiJGYWxzZSIsIm5iZiI6MTc0ODMzMTQwOSwiZXhwIjoxNzQ4MzQ5NDA5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.jyz04PqJedQJSFpNhMg3LevCBe7Assv-IfNuxYHdXVg";

        public BhytService(HttpClient httpClient, ILogger<BhytService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<BhytLookupResponse> LookupBhytAsync(string maSoBHXH)
        {
            try
            {
                // Prepare the request
                var requestUrl = $"{_vnpostApiUrl}?maSoBHXH={maSoBHXH}";

                var request = new HttpRequestMessage(HttpMethod.Get, requestUrl);
                request.Headers.Add("Authorization", $"Bearer {_bearerToken}");
                request.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36");
                request.Headers.Add("Accept", "application/json, text/plain, */*");
                request.Headers.Add("sec-ch-ua", "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"");
                request.Headers.Add("sec-ch-ua-platform", "\"Windows\"");
                request.Headers.Add("sec-ch-ua-mobile", "?0");
                request.Headers.Add("Sec-Fetch-Site", "same-origin");
                request.Headers.Add("Sec-Fetch-Mode", "cors");
                request.Headers.Add("Sec-Fetch-Dest", "empty");
                request.Headers.Add("host", "ssm.vnpost.vn");

                _logger.LogInformation($"Calling VNPost API for BHXH: {maSoBHXH}");

                var response = await _httpClient.SendAsync(request);
                var responseContent = await response.Content.ReadAsStringAsync();

                _logger.LogInformation($"VNPost API response status: {response.StatusCode}");
                _logger.LogInformation($"VNPost API response content: {responseContent}");

                if (response.IsSuccessStatusCode)
                {
                    // Try to parse the response
                    var vnpostResponse = JsonSerializer.Deserialize<VnpostApiResponse>(responseContent, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    if (vnpostResponse?.Data != null)
                    {
                        var bhytInfo = new BhytInfo
                        {
                            MaSoBHXH = vnpostResponse.Data.MaSoBhxh ?? maSoBHXH,
                            HoTen = vnpostResponse.Data.HoTen ?? "",
                            NgaySinh = vnpostResponse.Data.NgaySinhHienThi ?? "",
                            GioiTinh = vnpostResponse.Data.GioiTinhHienThi ?? "",
                            DiaChi = FormatAddress(vnpostResponse.Data),
                            MaThe = vnpostResponse.Data.SoTheBhyt ?? "",
                            GtTheTu = FormatDate(vnpostResponse.Data.TuNgay),
                            GtTheDen = FormatDate(vnpostResponse.Data.DenNgay),
                            NoiDKKCB = vnpostResponse.Data.CoSoKCB ?? "",
                            TrangThai = vnpostResponse.Data.TrangThaiThe ?? "",
                            MucHuong = vnpostResponse.Data.TyLeBhyt?.ToString("0.0") + "%" ?? ""
                        };

                        return new BhytLookupResponse
                        {
                            Success = true,
                            Data = bhytInfo
                        };
                    }
                    else
                    {
                        return new BhytLookupResponse
                        {
                            Success = false,
                            Message = "Không tìm thấy thông tin BHYT với mã số này"
                        };
                    }
                }
                else
                {
                    _logger.LogWarning($"VNPost API returned error: {response.StatusCode} - {responseContent}");
                    return new BhytLookupResponse
                    {
                        Success = false,
                        Message = "Không thể kết nối đến hệ thống tra cứu BHYT"
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while looking up BHYT for {maSoBHXH}");
                return new BhytLookupResponse
                {
                    Success = false,
                    Message = "Có lỗi xảy ra khi tra cứu thông tin BHYT"
                };
            }
        }

        private static string FormatDate(string? dateString)
        {
            if (string.IsNullOrEmpty(dateString) || dateString.Length != 8)
                return dateString ?? "";

            try
            {
                // Convert from YYYYMMDD to DD/MM/YYYY
                var year = dateString.Substring(0, 4);
                var month = dateString.Substring(4, 2);
                var day = dateString.Substring(6, 2);
                return $"{day}/{month}/{year}";
            }
            catch
            {
                return dateString;
            }
        }

        private static string FormatAddress(VnpostBhytData data)
        {
            var addressParts = new List<string>();

            if (!string.IsNullOrEmpty(data.DiaChiLh))
                addressParts.Add(data.DiaChiLh);

            if (!string.IsNullOrEmpty(data.TenTinhKCB))
                addressParts.Add(data.TenTinhKCB);

            return addressParts.Count > 0 ? string.Join(", ", addressParts) : "";
        }
    }

    // Internal classes for VNPost API response
    internal class VnpostApiResponse
    {
        public VnpostBhytData? Data { get; set; }
        public bool Success { get; set; }
        public string? Message { get; set; }
    }

    internal class VnpostBhytData
    {
        public string? MaSoBhxh { get; set; }
        public string? HoTen { get; set; }
        public string? NgaySinhHienThi { get; set; }
        public string? GioiTinhHienThi { get; set; }
        public string? DiaChiLh { get; set; }
        public string? SoTheBhyt { get; set; }
        public string? TuNgay { get; set; }
        public string? DenNgay { get; set; }
        public string? CoSoKCB { get; set; }
        public string? TrangThaiThe { get; set; }
        public double? TyLeBhyt { get; set; }
        public string? QuocTichHienThi { get; set; }
        public string? DanTocHienThi { get; set; }
        public string? TenTinhKCB { get; set; }
        public string? TenBenhVien { get; set; }
        public string? SoCmnd { get; set; }
        public string? SoDienThoai { get; set; }
    }
}
