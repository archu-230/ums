const RATE_LIMIT = {
    GLOBAL_API_LIMIT:
        "Too many requests. Please try again after 15 minutes.",

    LOGIN_API_LIMIT:
        "Too many login attempts. Please try again after 15 minutes.",

    SIGNUP_API_LIMIT:
        "Too many accounts created. Please try again after 1 hour.",
};

module.exports = RATE_LIMIT;