using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BhytController : ControllerBase
    {
        private readonly BhytService _bhytService;
        private readonly ILogger<BhytController> _logger;

        public BhytController(BhytService bhytService, ILogger<BhytController> logger)
        {
            _bhytService = bhytService;
            _logger = logger;
        }

        [HttpPost("lookup")]
        public async Task<IActionResult> LookupBhyt([FromBody] BhytLookupRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new BhytLookupResponse
                {
                    Success = false,
                    Message = "Dữ liệu đầu vào không hợp lệ"
                });
            }

            try
            {
                _logger.LogInformation($"BHYT lookup request for: {request.MaSoBHXH}");
                
                var result = await _bhytService.LookupBhytAsync(request.MaSoBHXH);
                
                if (result.Success)
                {
                    _logger.LogInformation($"BHYT lookup successful for: {request.MaSoBHXH}");
                    return Ok(result);
                }
                else
                {
                    _logger.LogWarning($"BHYT lookup failed for: {request.MaSoBHXH} - {result.Message}");
                    return Ok(result); // Return 200 with success=false for business logic failures
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error during BHYT lookup for: {request.MaSoBHXH}");
                return StatusCode(500, new BhytLookupResponse
                {
                    Success = false,
                    Message = "Có lỗi hệ thống xảy ra"
                });
            }
        }
    }
}
