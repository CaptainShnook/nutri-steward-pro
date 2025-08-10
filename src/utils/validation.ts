
// Input sanitization and validation utilities
export const sanitizeInput = (input: string): string => {
  // Remove HTML tags and potentially dangerous characters
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove remaining angle brackets
    .trim();
};

export const validateEmail = (email: string): boolean => {
  // More robust email validation regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
};

export const validateTextLength = (text: string, maxLength: number = 1000): boolean => {
  return text.length <= maxLength;
};

export const validateName = (name: string): boolean => {
  // Validate name contains only letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  return nameRegex.test(name) && name.length >= 1 && name.length <= 50;
};
