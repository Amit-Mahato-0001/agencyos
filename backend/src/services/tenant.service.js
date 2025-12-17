const Tenant = require("../models/tenant.model");

const createTenant = async (data) => {
    return Tenant.create(data);
}

module.exports = { createTenant };