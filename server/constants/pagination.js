const PAGINATION = {

    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    DEFAULT_SORT_BY: "createdAt",
    DEFAULT_SORT_ORDER: "desc",
    ALLOWED_SORT_FIELDS: [
        "name",
        "email",
        "createdAt",
        "updatedAt",
    ],
};

module.exports = PAGINATION;