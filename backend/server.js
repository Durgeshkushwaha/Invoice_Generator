const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors({
    origin: 'https://invoice-generator-ul3p.onrender.com', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing form data

//invoiceroutes
const invoiceRoutes = require('./routes/invoiceRoutes');
app.use('/api/invoices', invoiceRoutes);

//signuproutes
const signupRoutes = require('./routes/signupRoutes')
app.use('/api/signup', signupRoutes);

//loginroutes
const loginroutes = require('./routes/loginRoutes')
app.use('/api/login', loginroutes);



app.get('/', async (req, res) => {
    res.send("server is running");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));