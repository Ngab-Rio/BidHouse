const validateRequired = (data, requiredFields = []) => {
    return requiredFields.filter(field => !data[field]);
};

const isMinLength = (value, min = 8) => {
    return typeof value === "string" && value.length >= min;
};

module.exports = {
    validateRequired,
    isMinLength
};