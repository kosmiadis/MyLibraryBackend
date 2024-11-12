import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000 || process.env.PORT;
import booksRouter from './routes/books.js';

app.use(express.json());
app.use(cors());

app.use(booksRouter);

app.listen(PORT, () => {
    console.log('server running on http://localhost:'+PORT);
})