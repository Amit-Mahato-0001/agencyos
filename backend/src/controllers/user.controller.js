const userService = require("../services/user.service");
const bcrypt = require("bcrypt");

const createClient = async (req, res) => {

    try{
        const{ email } = req.body

        if(!email){
            return res.status(400).json({ message: "Email required" });
        }

        const hashedPassword = await bcrypt.hash("client@123", 10) // Temporary Password

        const client = await userService.createUser({
            email,
            password: hashedPassword,
            role: "client",
            tenantId: req.tenantId,
            status: "active"
        })

        res.status(201).json(client);
    } catch(err){
        res.status(500).json({ message: "Client creation failed" })
    }
};

module.exports = { createClient };
