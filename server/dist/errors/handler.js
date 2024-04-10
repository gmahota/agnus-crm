"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const errorHandler = (error, request, response, next) => {
    if (error instanceof yup_1.ValidationError) {
        let errors = {};
        error.inner.forEach(err => {
            const path = err.path || "";
            if (path.length > 0) {
                errors[path] = err.errors;
            }
        });
        return response.status(400).json({ message: "Validation Errors", errors });
    }
    console.error(error);
    return response.status(500).json({ message: 'Internal server error' });
};
exports.default = errorHandler;
