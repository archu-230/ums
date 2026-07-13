const { HTTP_STATUS_CODES, getReasonPhrase, } = require("../constants/http-status-codes");

class HttpExceptions extends Error {
    constructor(statusCode, message, errorCode, details) {
        super(message || getReasonPhrase(statusCode));

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.details = details || [];

        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequestException extends HttpExceptions {
    constructor(
        message = "Request could not be processed.",
        details = []
    ) {
        super(
            HTTP_STATUS_CODES.BAD_REQUEST,
            message,
            details
        );
    }
}

class UnauthorizedException extends HttpExceptions {
    constructor(
        message = "Unauthorized.",
        details = []
    ) {
        super(
            HTTP_STATUS_CODES.UNAUTHORIZED,
            message,
            details
        );
    }
}

class ForbiddenException extends HttpExceptions {
    constructor(
        message = "Forbidden.",
        details = []
    ) {
        super(
            HTTP_STATUS_CODES.FORBIDDEN,
            message,
            details
        );
    }
}

class NotFoundException extends HttpExceptions {
    constructor(
        message = "Resource not found.",
        details = []
    ) {
        super(
            HTTP_STATUS_CODES.NOT_FOUND,
            message,
            details
        );
    }
}

class ConflictException extends HttpExceptions {
    constructor(
        message = "Conflict occurred.",
        details = []
    ) {
        super(
            HTTP_STATUS_CODES.CONFLICT,
            message,
            details
        );
    }
}

class InternalServerErrorException extends HttpExceptions {
    constructor(
        message = "Internal server error.",
        details = []
    ) {
        super(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message,
            details
        );
    }
}

module.exports = {
    HttpExceptions,
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,

};