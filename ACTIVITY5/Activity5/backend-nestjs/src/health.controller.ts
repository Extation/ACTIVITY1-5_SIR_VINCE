import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Health controller for monitoring API status and availability.
 * Provides a simple endpoint to check if the application is running properly.
 * Used for uptime monitoring and load balancer health checks in the Blog Platform.
 */
@ApiTags('health')
@Controller('health')
export class HealthController {
  /**
   * Health check endpoint that returns the current status of the API.
   * Used for monitoring, load balancer health checks, and uptime verification.
   *
   * @returns Object containing status and message indicating API health
   */
  @Get()
  @ApiOperation({ summary: 'Check API health' })
  @ApiResponse({ status: 200, description: 'API is healthy' })
  checkHealth() {
    return { status: 'ok', message: 'Blog Platform API is running' };
  }
}
