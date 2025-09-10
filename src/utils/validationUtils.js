/**
 * Utility functions for input validation and sanitization
 */

// Email validation regex (RFC 5322 compliant simplified version)
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// List of personal email domains that should be blocked
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.fr',
  'yahoo.de',
  'yahoo.es',
  'yahoo.it',
  'yahoo.ca',
  'yahoo.com.br',
  'yahoo.in',
  'yahoo.jp',
  'yahoo.com.au',
  'outlook.com',
  'hotmail.com',
  'hotmail.co.uk',
  'hotmail.fr',
  'hotmail.de',
  'hotmail.es',
  'hotmail.it',
  'live.com',
  'msn.com',
  'proton.com',
  'proton.me',
  'protonmail.com',
  'protonmail.ch',
  'pm.me',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'aim.com',
  'zoho.com',
  'yandex.com',
  'yandex.ru',
  'mail.com',
  'gmx.com',
  'gmx.net',
  'gmx.de',
  'fastmail.com',
  'fastmail.fm',
  'tutanota.com',
  'tutanota.de',
  'tuta.com',
  'mail.ru',
  'inbox.com',
  'zohomail.com',
  'qq.com',
  '163.com',
  '126.com',
  'sina.com',
  'rediffmail.com',
  'rocketmail.com',
  'optonline.net',
  'comcast.net',
  'verizon.net',
  'att.net',
  'sbcglobal.net',
  'bellsouth.net',
  'cox.net',
  'earthlink.net',
  'charter.net',
  'shaw.ca',
  'rogers.com',
  'sympatico.ca',
  'btinternet.com',
  'virginmedia.com',
  'sky.com',
  'talktalk.net',
  'tiscali.co.uk',
  'btopenworld.com',
  'orange.fr',
  'wanadoo.fr',
  'free.fr',
  'laposte.net',
  'sfr.fr',
  'neuf.fr',
  'gmx.fr',
  'web.de',
  't-online.de',
  'arcor.de',
  'freenet.de',
  'libero.it',
  'virgilio.it',
  'alice.it',
  'tin.it',
  'email.it',
  'tiscali.it',
  'fastwebnet.it',
  'terra.es',
  'telefonica.net',
  'ya.ru',
  'rambler.ru',
  'list.ru',
  'bk.ru',
  'inbox.ru',
  'mail.bg',
  'abv.bg',
  'dir.bg',
  'seznam.cz',
  'centrum.cz',
  'atlas.cz',
  'volny.cz',
  'wp.pl',
  'o2.pl',
  'interia.pl',
  'onet.pl',
  'gazeta.pl',
  'op.pl',
  'vp.pl',
  'tlen.pl',
  'poczta.fm',
  'freemail.hu',
  'citromail.hu',
  'mailbox.org',
  'posteo.de',
  'runbox.com',
  'countermail.com',
  'hushmail.com',
  'disroot.org',
  'riseup.net',
  'autistici.org',
  'inventati.org',
  'duck.com',
  'duckduckgo.com'
];

/**
 * Checks if an email domain is a personal email provider
 * @param {string} email - The email string to check
 * @returns {boolean} - true if the email is from a personal provider
 */
export const isPersonalEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const domain = email.toLowerCase().split('@')[1];
  if (!domain) {
    return false;
  }
  
  return PERSONAL_EMAIL_DOMAINS.includes(domain);
};

/**
 * Validates and sanitizes email input
 * @param {string} email - The email string to validate
 * @returns {Object} - {isValid: boolean, sanitized: string, errors: string[], warnings: string[]}
 */
export const validateEmail = (email) => {
  const errors = [];
  const warnings = [];
  let sanitized = "";

  // Basic type checking
  if (typeof email !== "string") {
    errors.push("Email must be a string");
    return { isValid: false, sanitized: "", errors, warnings };
  }

  // Remove leading/trailing whitespace
  sanitized = email.trim();

  // Check for empty string
  if (!sanitized) {
    errors.push("Email cannot be empty");
    return { isValid: false, sanitized: "", errors, warnings };
  }

  // Check length (reasonable limits)
  if (sanitized.length > 254) {
    errors.push("Email is too long (max 254 characters)");
    return { isValid: false, sanitized: "", errors, warnings };
  }

  // Check for common patterns that indicate invalid email
  if (sanitized.includes(" ") && !sanitized.includes('"')) {
    errors.push("Email cannot contain unquoted spaces");
  }

  if (sanitized.startsWith("@") || sanitized.endsWith("@")) {
    errors.push("Email cannot start or end with @");
  }

  // Check for basic @ symbol presence
  if (!sanitized.includes("@")) {
    errors.push("Email must contain @ symbol");
  }

  // Validate against regex if basic checks pass
  if (errors.length === 0 && !EMAIL_REGEX.test(sanitized)) {
    errors.push("Email format is invalid");
  }

  // Check for personal email domains
  if (errors.length === 0 && isPersonalEmail(sanitized)) {
    errors.push("Please use your company email address, not a personal email");
    warnings.push("Personal email domains (Gmail, Yahoo, Outlook, etc.) are not accepted");
  }

  // Additional security checks
  if (
    sanitized.includes("<script") ||
    sanitized.includes("<iframe") ||
    sanitized.includes("javascript:")
  ) {
    errors.push("Email contains potentially malicious content");
  }

  return {
    isValid: errors.length === 0,
    sanitized: sanitized.toLowerCase(), // Normalize to lowercase for consistency
    errors,
    warnings,
  };
};

/**
 * Validates answer input for questions
 * @param {string} answer - The answer to validate
 * @returns {Object} - {isValid: boolean, sanitized: string, errors: string[]}
 */
export const validateAnswer = (answer) => {
  const errors = [];
  let sanitized = "";

  const validAnswers = ["yes", "no", "na"];

  // Basic type checking
  if (typeof answer !== "string") {
    errors.push("Answer must be a string");
    return { isValid: false, sanitized: "", errors };
  }

  // Remove leading/trailing whitespace and convert to lowercase
  sanitized = answer.trim().toLowerCase();

  // Check if answer is in valid set
  if (!validAnswers.includes(sanitized)) {
    errors.push(`Answer must be one of: ${validAnswers.join(", ")}`);
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  };
};

/**
 * Sanitizes string input to prevent XSS and other injection attacks
 * @param {string} input - The string to sanitize
 * @returns {string} - The sanitized string
 */
export const sanitizeString = (input) => {
  if (typeof input !== "string") {
    return "";
  }

  return (
    input
      .trim()
      // Remove potentially dangerous HTML/script tags
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "") // Remove event handlers
      // Escape HTML entities
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;")
  );
};

/**
 * Validates the scorecard data structure
 * @param {Object} data - The scorecard data to validate
 * @returns {Object} - {isValid: boolean, errors: string[], warnings: string[]}
 */
export const validateScorecardData = (data) => {
  const errors = [];
  const warnings = [];

  // Check if data exists
  if (!data) {
    errors.push("Scorecard data is null or undefined");
    return { isValid: false, errors, warnings };
  }

  // Check categories array
  if (!data.categories || !Array.isArray(data.categories)) {
    errors.push("Categories must be an array");
    return { isValid: false, errors, warnings };
  }

  if (data.categories.length === 0) {
    warnings.push("No categories found in scorecard data");
  }

  // Validate each category
  data.categories.forEach((category, index) => {
    if (!category || typeof category !== "object") {
      errors.push(`Category ${index + 1} is not a valid object`);
      return;
    }

    if (!category.name || typeof category.name !== "string") {
      errors.push(`Category ${index + 1} missing or invalid name`);
    }

    if (!category.icon || typeof category.icon !== "string") {
      warnings.push(
        `Category ${index + 1} (${category.name || "unnamed"}) missing icon`,
      );
    }

    // Validate questions array
    if (category.questions && !Array.isArray(category.questions)) {
      errors.push(
        `Category ${index + 1} (${category.name || "unnamed"}): questions must be an array`,
      );
    }

    if (category.questions && category.questions.length > 0) {
      category.questions.forEach((question, qIndex) => {
        if (!question || typeof question !== "object") {
          errors.push(
            `Category ${index + 1}, Question ${qIndex + 1}: invalid question object`,
          );
          return;
        }

        if (!question.id || typeof question.id !== "string") {
          errors.push(
            `Category ${index + 1}, Question ${qIndex + 1}: missing or invalid question ID`,
          );
        }

        if (!question.text || typeof question.text !== "string") {
          errors.push(
            `Category ${index + 1}, Question ${qIndex + 1}: missing or invalid question text`,
          );
        }

        if (
          typeof question.weight !== "number" ||
          question.weight < 1 ||
          question.weight > 5
        ) {
          errors.push(
            `Category ${index + 1}, Question ${qIndex + 1}: weight must be a number between 1-5`,
          );
        }
      });
    }

    // Validate subCategories array
    if (category.subCategories && !Array.isArray(category.subCategories)) {
      errors.push(
        `Category ${index + 1} (${category.name || "unnamed"}): subCategories must be an array`,
      );
    }

    if (category.subCategories && category.subCategories.length > 0) {
      category.subCategories.forEach((subCategory, subIndex) => {
        if (!subCategory || typeof subCategory !== "object") {
          errors.push(
            `Category ${index + 1}, SubCategory ${subIndex + 1}: invalid subCategory object`,
          );
          return;
        }

        if (!subCategory.name || typeof subCategory.name !== "string") {
          errors.push(
            `Category ${index + 1}, SubCategory ${subIndex + 1}: missing or invalid name`,
          );
        }

        // Validate subCategory questions
        if (subCategory.questions && !Array.isArray(subCategory.questions)) {
          errors.push(
            `Category ${index + 1}, SubCategory ${subIndex + 1}: questions must be an array`,
          );
        }

        if (subCategory.questions && subCategory.questions.length > 0) {
          subCategory.questions.forEach((question, qIndex) => {
            // Same validation as main questions
            if (!question || typeof question !== "object") {
              errors.push(
                `Category ${index + 1}, SubCategory ${subIndex + 1}, Question ${qIndex + 1}: invalid question object`,
              );
              return;
            }

            if (!question.id || typeof question.id !== "string") {
              errors.push(
                `Category ${index + 1}, SubCategory ${subIndex + 1}, Question ${qIndex + 1}: missing or invalid question ID`,
              );
            }

            if (!question.text || typeof question.text !== "string") {
              errors.push(
                `Category ${index + 1}, SubCategory ${subIndex + 1}, Question ${qIndex + 1}: missing or invalid question text`,
              );
            }

            if (
              typeof question.weight !== "number" ||
              question.weight < 1 ||
              question.weight > 5
            ) {
              errors.push(
                `Category ${index + 1}, SubCategory ${subIndex + 1}, Question ${qIndex + 1}: weight must be a number between 1-5`,
              );
            }
          });
        }
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validates API response structure
 * @param {Object} response - The API response to validate
 * @returns {boolean} - Whether the response is valid
 */
export const validateApiResponse = (response) => {
  if (!response || typeof response !== "object") {
    return false;
  }

  // Check for expected properties
  if (typeof response.ok !== "boolean") {
    return false;
  }

  if (response.ok && !response.message) {
    console.warn("API response is ok but missing message");
  }

  return true;
};