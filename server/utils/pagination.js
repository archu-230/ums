const PAGINATION = require("../constants/pagination");

const buildPagination = (query = {}) => {

    const page = Math.max(
        Number(query.page) || PAGINATION.DEFAULT_PAGE,
        1
    );

    const limit = Math.max(
        Number(query.limit) || PAGINATION.DEFAULT_LIMIT,
        1
    );

    const sortBy =
        PAGINATION.ALLOWED_SORT_FIELDS.includes(query.sortBy)
            ? query.sortBy
            : PAGINATION.DEFAULT_SORT_BY;

    const sortOrder =
        query.sortOrder === "asc"
            ? 1
            : -1;

    return {

        page,
        limit,
        skip: (page - 1) * limit,
        sort: {
            [sortBy]: sortOrder,
        },
    };
};

module.exports = {
    buildPagination,
};