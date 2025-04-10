const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


createlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) console.log("All field  are required");
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ meassage: "user doesn't exist" })

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) return res.status(401).json({ message: "Invalid email or password" })

        // ✅ Generate token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.status(201).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { createlogin };