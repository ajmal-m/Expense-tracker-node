const express = require('express');
const dotenv = require("dotenv");
const authRouter = require('./routes/auth-routes');
const categoryRouter = require('./routes/category-routes');
const expenseRouter = require('./routes/expense-router');
const connectDB = require('./config/db');
const cors = require('cors');


connectDB();

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/expense', expenseRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
