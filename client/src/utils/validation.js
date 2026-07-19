const getValidationErrors = (issues) => {
    const errors = {};

    issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
    });

    return errors;
};

export default getValidationErrors;