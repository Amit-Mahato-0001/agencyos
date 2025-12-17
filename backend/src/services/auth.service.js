const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createTenant } = require("../services/tenant.service")
const { createUser } = require("../services/user.service")

const signup = async ({ agencyName, email, password }) => {

    // Pass hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Company create
    const tenant = await createTenant({ name: agencyName });

    // Create user as owner
    const user = await createUser({
        email,
        password: hashedPassword,
        role: "owner",
        tenantId: tenant._id
    });

    // Login token
    const token = jwt.sign({
        userId: user._id,
        tenantId: tenant._id,
        role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
);
return { token };
};

module.exports = { signup };