/**
 * Form input validators
 */

export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

/**
 * Validates registration form inputs before submitting to backend
 * @param {Object} form - { name, email, password, confirmPassword }
 * @returns {Object} { isValid, error }
 */
export const validateRegistrationForm = ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'Full name is required' };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }

  if (name.trim().length > 50) {
    return { isValid: false, error: 'Name cannot exceed 50 characters' };
  }

  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email address is required' };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (!isValidPassword(password)) {
    return {
      isValid: false,
      error: 'Password must be at least 6 characters long',
    };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true, error: null };
};
