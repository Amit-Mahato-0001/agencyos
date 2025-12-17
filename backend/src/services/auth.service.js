const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createTenant } = require("../services/tenant.service")
const { createUser } = require("../services/user.service")
const User = require("../models/user.model");

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

const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if(!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
        {
            userId: user._id,
            tenantId: user.tenantId,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { token };
}

module.exports = { signup, login };