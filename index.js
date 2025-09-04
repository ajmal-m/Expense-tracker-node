const express = require('express');
const dotenv = require("dotenv");
const authRouter = require('./routes/auth-routes');
const categoryRouter = require('./routes/category-routes');
const connectDB = require('./config/db');

connectDB();

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
