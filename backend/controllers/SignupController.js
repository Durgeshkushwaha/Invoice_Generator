const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


createsignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Received data:", { name, email, password }); // Log incoming data

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email })
        console.log(existingUser)
        if (existingUser) return res.status(403).json({ message: "User already exist" })

        const hashedpassword = await bcrypt.hash(password, 10);
        console.log("passwordddd", hashedpassword)
        const newUser = new User({
            name,
            email,
            password: hashedpassword,
        });
        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Signup successful',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

module.exports = { createsignup }