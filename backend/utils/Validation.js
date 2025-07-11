import { ApiResponse } from './ApiResponse.js';

// Name Validation: Min 20 characters, Max 60 characters
const NameValidation = (name) => {
    const errors = [];
    
    if (!name || typeof name !== 'string') {
        errors.push('Name is required');
        return new ApiResponse(400, null, 'Name validation failed', errors);
    }
    
    const trimmedName = name.trim();
    
    if (trimmedName.length < 20) {
        errors.push('Name must be at least 20 characters long');
    }
    
    if (trimmedName.length > 60) {
        errors.push('Name must not exceed 60 characters');
    }
    
    if (errors.length > 0) {
        return new ApiResponse(400, null, 'Name validation failed', errors);
    }
    
    return new ApiResponse(200, { name: trimmedName }, 'Name validation successful');
};

// Address Validation: Max 400 characters
const AddressValidation = (address) => {
    const errors = [];
    
    if (!address || typeof address !== 'string') {
        errors.push('Address is required');
        return new ApiResponse(400, null, 'Address validation failed', errors);
    }
    
    const trimmedAddress = address.trim();
    
    if (trimmedAddress.length === 0) {
        errors.push('Address cannot be empty');
    }
    
    if (trimmedAddress.length > 400) {
        errors.push('Address must not exceed 400 characters');
    }
    
    if (errors.length > 0) {
        return new ApiResponse(400, null, 'Address validation failed', errors);
    }
    
    return new ApiResponse(200, { address: trimmedAddress }, 'Address validation successful');
};

// Password Validation: 8-16 characters, must include at least one uppercase letter and one special character
const PasswordValidation = (password) => {
    const errors = [];
    
    if (!password || typeof password !== 'string') {
        errors.push('Password is required');
        return new ApiResponse(400, null, 'Password validation failed', errors);
    }
    
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    
    if (password.length > 16) {
        errors.push('Password must not exceed 16 characters');
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    
    if (errors.length > 0) {
        return new ApiResponse(400, null, 'Password validation failed', errors);
    }
    
    return new ApiResponse(200, { password: '***' }, 'Password validation successful');
};

// Email Validation: Must follow standard email validation rules
const EmailValidation = (email) => {
    const errors = [];
    
    if (!email || typeof email !== 'string') {
        errors.push('Email is required');
        return new ApiResponse(400, null, 'Email validation failed', errors);
    }
    
    const trimmedEmail = email.trim().toLowerCase();
    
    // Basic email regex pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(trimmedEmail)) {
        errors.push('Please enter a valid email address');
    }
    
    // Additional checks
    if (trimmedEmail.length > 254) {
        errors.push('Email address is too long');
    }
    
    // Check for multiple @ symbols
    if ((trimmedEmail.match(/@/g) || []).length !== 1) {
        errors.push('Email must contain exactly one @ symbol');
    }
    
    if (errors.length > 0) {
        return new ApiResponse(400, null, 'Email validation failed', errors);
    }
    
    return new ApiResponse(200, { email: trimmedEmail }, 'Email validation successful');
};

// Combined validation function for all fields
const validateUser = (userData) => {
    const { name, address, password, email } = userData;
    
    const validationResults = {
        name: NameValidation(name),
        address: AddressValidation(address),
        password: PasswordValidation(password),
        email: EmailValidation(email)
    };
    
    // Check if all validations passed
    const allValid = Object.values(validationResults).every(result => result.success);
    
    if (!allValid) {
        const allErrors = {};
        Object.entries(validationResults).forEach(([field, result]) => {
            if (!result.success) {
                allErrors[field] = result.message;
            }
        });
        
        return new ApiResponse(400, allErrors, 'User validation failed');
    }
    
    // If all validations pass, return sanitized data
    const sanitizedData = {
        name: validationResults.name.data.name,
        address: validationResults.address.data.address,
        email: validationResults.email.data.email,
        // Don't include password in response data for security
    };
    
    return new ApiResponse(200, sanitizedData, 'User validation successful');
};

// Export all validation functions
export {
    NameValidation,
    AddressValidation,
    PasswordValidation,
    EmailValidation,
    validateUser
};