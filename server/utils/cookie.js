const ENV = require("../constants/env");
const COOKIE_NAMES = require("../constants/cookies");
const { parseDurationToMs } = require("./time");

const buildCookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    maxAge,
    path: "/",
});

const setAccessTokenCookie = (res, accessToken) => {
    res.cookie(
        COOKIE_NAMES.ACCESS_TOKEN,
        accessToken,
        buildCookieOptions(parseDurationToMs(ENV.ACCESS_TOKEN_EXPIRY))
    );
};

const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie(
        COOKIE_NAMES.REFRESH_TOKEN,
        refreshToken,
        buildCookieOptions(parseDurationToMs(ENV.REFRESH_TOKEN_EXPIRY))
    );
};

const setAuthCookies = (res, { accessToken, refreshToken }) => {
    setAccessTokenCookie(res, accessToken);

    if (refreshToken) {
        setRefreshTokenCookie(res, refreshToken);
    }
};

const clearAuthCookies = (res) => {
    res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN, { path: "/" });
    res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN, { path: "/" });
};

module.exports = {
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setAuthCookies,
    clearAuthCookies,
};