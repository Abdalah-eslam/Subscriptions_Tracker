
const ErrorMiddleware = (err, req, res, next) => {
try {
    let error = err;
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        error = new Error(messages.join(', '));
        error.statusCode = 400;
    }

    else if (err.code === 11000) {
        const field = Object.keys(err.keyValue).join(', ');
        error = new Error(`Duplicate field value: ${field}. Please use another value!`);
        error.statusCode = 400;
    }
    else if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new Error(message);
        error.statusCode = 404;
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
} catch (error) {
    next(error);
}
}
export default ErrorMiddleware;