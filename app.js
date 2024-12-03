import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000 || process.env.PORT;
import booksRouter from './routes/books.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your React app's origin
    credentials: true, // Allow cookies and other credentials
}));
app.use(cookieParser());

app.use(authRouter);
app.use(booksRouter);

app.listen(PORT, () => {
    console.log('server running on http://localhost:'+PORT);
})