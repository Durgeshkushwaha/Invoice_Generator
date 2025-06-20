const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

// app.use(cors());
// app.use(cors({
//     origin: ['https://invoice-generator-ul3p.onrender.com', 'https://localhost:5173'], // Your frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));


const allowedOrigins = [
    'https://invoice-generator-ul3p.onrender.com', // Production frontend
    'https://invoice-generator-backend-nvro.onrender.com', // Your actual backend URL
    'http://localhost:5173' // Local development 
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Must be true if frontend sends cookies/auth
}));

app.options('*', cors()); // Handle preflight requests
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