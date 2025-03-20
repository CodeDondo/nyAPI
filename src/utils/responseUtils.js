/**
 * @param {Object} res
 * @param {any} data
 * @param {String} [message="success"]
 * @param {number} [statusCode=200]
 */

export const successResponse = (res, data, message = "Success", statusCode = 200) => {
    const response = { message };

    if (data) {
        response.data = data;
    }

    res.status(statusCode).json(response);
};

/**
 * 
 * @param {Object} res
 * @param {String} [message="Interal Server Error"]
 * @param {number} [statusCode=500]
 */
export const errorResponse = (res, message = "Internal Server Error", error = {}, statusCode = 500) => {
    let obj_error = { message: message}
    if (error.name === "SequelizeValidationError") {
        obj_error.sequlize_validation_errors = error.errors.map(err => ({
            field: err.path,
            message: err.message
        }));
    }
    res.status(statusCode).json(obj_error);
};