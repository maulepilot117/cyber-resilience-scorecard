/**
 * Utility functions for API requests with comprehensive error handling
 * Optimized for hackathon demo with reduced retries
 */

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

/**
 * Configuration for API requests
 * Reduced retries and timeout for faster demo feedback
 */
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  TIMEOUT: 10000, // Reduced from 30s to 10s for demos
  RETRIES: 1, // Reduced from 3 to 1 for faster feedback
  RETRY_DELAY: 500, // Reduced from 1000ms to 500ms
};

/**
 * Sleep utility for retry delays
 * @param {number} ms - Milliseconds to sleep
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Validates request configuration
 * @param {Object} config - Request configuration
 * @returns {boolean} - Whether config is valid
 */
const validateRequestConfig = (config) => {
  if (!config || typeof config !== 'object') {
    console.error('Request config must be an object');
    return false;
  }

  if (typeof config.method !== 'string') {
    console.error('Request method must be a string');
    return false;
  }

  const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  if (!validMethods.includes(config.method.toUpperCase())) {
    console.error(`Invalid HTTP method: ${config.method}`);
    return false;
  }

  if (typeof config.endpoint !== 'string' || !config.endpoint.trim()) {
    console.error('Request endpoint must be a non-empty string');
    return false;
  }

  return true;
};

/**
 * Creates full URL from endpoint
 * @param {string} endpoint - API endpoint
 * @returns {string} - Full URL
 */
const createUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

  // Construct full URL
  const baseUrl = API_CONFIG.BASE_URL.endsWith('/')
    ? API_CONFIG.BASE_URL.slice(0, -1)
    : API_CONFIG.BASE_URL;

  return `${baseUrl}/${cleanEndpoint}`;
};

/**
 * Sanitizes request body for JSON transmission
 * @param {Object} body - Request body
 * @returns {Object} - Sanitized body
 */
const sanitizeRequestBody = (body) => {
  if (!body || typeof body !== 'object') {
    return body;
  }

  const sanitized = { ...body };

  // Basic sanitization - remove undefined values
  Object.keys(sanitized).forEach(key => {
    if (sanitized[key] === undefined) {
      delete sanitized[key];
    }
  });

  return sanitized;
};

/**
 * Handles fetch errors and converts to ApiError
 * @param {Error} error - Original error
 * @param {string} endpoint - API endpoint
 * @returns {ApiError} - Standardized API error
 */
const handleFetchError = (error, endpoint) => {
  console.error(`API Request failed for ${endpoint}:`, error);

  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return new ApiError(
      'Network error: Unable to connect to the server. Please check if the backend is running.',
      0,
      null
    );
  }

  if (error.name === 'AbortError') {
    return new ApiError(
      'Request timed out. The server took too long to respond.',
      408,
      null
    );
  }

  return new ApiError(
    `Request failed: ${error.message}`,
    0,
    null
  );
};

/**
 * Processes API response and handles common error cases
 * @param {Response} response - Fetch response object
 * @param {string} endpoint - API endpoint
 * @returns {Object} - Processed response
 */
const processResponse = async (response, endpoint) => {
  // Handle HTTP error status codes
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (parseError) {
      console.warn('Failed to parse error response as JSON:', parseError);
    }

    console.error(`API Error for ${endpoint}:`, {
      status: response.status,
      statusText: response.statusText,
      errorMessage
    });

    throw new ApiError(errorMessage, response.status, response);
  }

  // Handle successful responses
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    try {
      const jsonData = await response.json();
      return jsonData;
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      throw new ApiError(
        'Invalid JSON response from server',
        response.status,
        response
      );
    }
  } else {
    // Handle non-JSON responses (e.g., plain text, HTML)
    try {
      const textData = await response.text();
      console.warn(`Received non-JSON response from ${endpoint}:`, textData);
      return { message: textData };
    } catch (textError) {
      console.error('Failed to read text response:', textError);
      throw new ApiError(
        'Unable to read server response',
        response.status,
        response
      );
    }
  }
};

/**
 * Makes an API request with retry logic and comprehensive error handling
 * @param {Object} config - Request configuration
 * @param {string} config.method - HTTP method (GET, POST, etc.)
 * @param {string} config.endpoint - API endpoint
 * @param {Object} [config.body] - Request body for POST/PUT requests
 * @param {Object} [config.headers] - Additional headers
 * @param {number} [config.timeout] - Request timeout in milliseconds
 * @returns {Promise<Object>} - API response data
 */
export const apiRequest = async (config) => {
  // Validate configuration
  if (!validateRequestConfig(config)) {
    throw new ApiError('Invalid request configuration', 400, null);
  }

  const {
    method,
    endpoint,
    body,
    headers = {},
    timeout = API_CONFIG.TIMEOUT
  } = config;

  const url = createUrl(endpoint);
  let lastError = null;

  // Retry logic (reduced for demo)
  for (let attempt = 1; attempt <= API_CONFIG.RETRIES; attempt++) {
    try {
      console.log(`API Request: ${method} ${url}`);

      // Prepare request options
      const requestOptions = {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        signal: AbortSignal.timeout(timeout)
      };

      // Add body for non-GET requests
      if (body && method.toUpperCase() !== 'GET') {
        requestOptions.body = JSON.stringify(sanitizeRequestBody(body));
      }

      // Make the request
      const response = await fetch(url, requestOptions);

      // Process and return the response
      const data = await processResponse(response, endpoint);
      console.log(`API Request successful: ${method} ${url}`);
      return data;

    } catch (error) {
      lastError = error;
      console.warn(`API Request failed:`, error.message);

      // Don't retry on client errors (4xx) except 408 (timeout), 429 (rate limit)
      if (error.status && error.status >= 400 && error.status < 500 && error.status !== 408 && error.status !== 429) {
        console.log('Client error - not retrying');
        throw error;
      }

      // Don't retry on the last attempt
      if (attempt === API_CONFIG.RETRIES) {
        break;
      }

      // Wait before retrying (shorter delay for demo)
      console.log(`Retrying in ${API_CONFIG.RETRY_DELAY}ms...`);
      await sleep(API_CONFIG.RETRY_DELAY);
    }
  }

  // All retries failed
  const finalError = lastError instanceof ApiError
    ? lastError
    : handleFetchError(lastError, endpoint);

  console.error('API request failed');
  throw finalError;
};

/**
 * Convenience method for POST requests (commonly used for sending assessment data)
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @param {Object} [options] - Additional options
 * @returns {Promise<Object>} - API response data
 */
export const postData = async (endpoint, data, options = {}) => {
  return apiRequest({
    method: 'POST',
    endpoint,
    body: data,
    ...options
  });
};

/**
 * Convenience method for GET requests
 * @param {string} endpoint - API endpoint
 * @param {Object} [options] - Additional options
 * @returns {Promise<Object>} - API response data
 */
export const getData = async (endpoint, options = {}) => {
  return apiRequest({
    method: 'GET',
    endpoint,
    ...options
  });
};