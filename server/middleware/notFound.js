module.exports = (req, res, next) => {

    const error = new Error("Route Not Found");

    error.statusCode = 404;

    next(error);

};