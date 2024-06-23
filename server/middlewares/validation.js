const { param, body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       // Create a dynamic message with key-value pairs for each failed field
       const errorDetails = errors.array().reduce((acc, error) => {
          acc[error.path] = error.msg;
          return acc;
       }, {});
 
       return res.status(400).json({ message: 'Validation failed', errors: errorDetails });
    }
    next();
}; 

module.exports = { handleValidationErrors };
