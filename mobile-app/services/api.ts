// mobile-app/services/api.ts
// HTTP client for calling the Next.js backend API

import Constants from 'expo-constants';
import { ScamCheckRequest, ScamCheckResult, ScamCheckError } from '../types/scam';

/**
 * Get the API base URL from environment configuration
 *
 * For local development:
 * - iOS Simulator: http://localhost:3000
 * - Android Emulator: http://10.0.2.2:3000 (Android's special alias for host machine)
 * - Physical device: http://YOUR_COMPUTER_IP:3000
 *
 * For production: https://your-domain.com
 */
function getApiBaseUrl(): string {
  // Try to get from app config first
  const configUrl = Constants.expoConfig?.extra?.apiBaseUrl;
  if (configUrl) {
    return configUrl;
  }

  // Fallback based on platform
  // Note: You may need to adjust this based on your development setup
  return 'http://localhost:3000';
}

const API_BASE_URL = getApiBaseUrl();

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errorCode?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Calls the /api/check-scam endpoint to analyze a message
 *
 * @param request - The scam check request payload
 * @returns Promise<ScamCheckResult> - The analysis result
 * @throws ApiError if the request fails
 */
export async function checkScam(
  request: ScamCheckRequest
): Promise<ScamCheckResult> {
  const endpoint = `${API_BASE_URL}/api/check-scam`;

  try {
    console.log('[API] Calling check-scam endpoint:', endpoint);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    console.log('[API] Response status:', response.status);

    // Parse response
    let data: ScamCheckResult | ScamCheckError;
    try {
      data = await response.json();
    } catch (parseError) {
      throw new ApiError(
        'Unable to connect to the scam-check service. Please check your internet connection and try again.',
        response.status
      );
    }

    // Handle error responses
    if (!response.ok) {
      const errorData = data as ScamCheckError;
      throw new ApiError(
        errorData.message || 'Failed to analyze the message. Please try again.',
        response.status,
        errorData.error
      );
    }

    // Validate response structure
    const result = data as ScamCheckResult;
    if (!result.verdict || !result.summary || !Array.isArray(result.tactics) || !Array.isArray(result.safeSteps)) {
      throw new ApiError(
        'Received an invalid response from the server. Please try again.',
        response.status,
        'INVALID_RESPONSE'
      );
    }

    return result;

  } catch (error) {
    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('Network request failed')) {
      throw new ApiError(
        'Cannot connect to the scam-check service. Please check that:\n\n' +
        '1. Your internet connection is working\n' +
        '2. The backend server is running\n' +
        '3. The API URL is correctly configured\n\n' +
        `Trying to connect to: ${API_BASE_URL}`,
        undefined,
        'NETWORK_ERROR'
      );
    }

    // Handle other unexpected errors
    console.error('[API] Unexpected error:', error);
    throw new ApiError(
      'An unexpected error occurred. Please try again later.',
      undefined,
      'UNKNOWN_ERROR'
    );
  }
}

/**
 * Get the configured API base URL (for debugging/display purposes)
 */
export function getConfiguredApiUrl(): string {
  return API_BASE_URL;
}
