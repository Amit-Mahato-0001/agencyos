const user = require("../models/user.model");

const createUser = async (data) => {
    return user.create(data);
};

module.exports = { createUser };