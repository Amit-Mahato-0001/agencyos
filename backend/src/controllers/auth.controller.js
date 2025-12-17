const authService = require("../services/auth.service");

const signup = async (req, res) => {
    try {
        const { agencyName, email, password } = req.body;

        if(!agencyName || !email || !password){
            return res.status(400).json({ message: "All fields required" });
        }

        const result = await authService.signup({
            agencyName,
            email,
            password
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Signup failed" });
    }
};

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const result = await authService.login({ email, password });
        res.json(result);
    } catch {
        res.status(401).json({ message: "Invalid credentials" });
    }
}

module.exports = { signup, login };