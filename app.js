const express = require('express');
const cors = require('cors');
const books = require('./books.json');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

app.get('/my-books', (req, res) => {
    res.status(200).send(books.books);
});

app.get('/my-books/:id', (req, res) => {
    const { id } = req.params;

    const foundBook = books.books.filter(b => b.id === id);

    if (foundBook.length > 0) {
        res.status(200).send(foundBook[0])
        
    }
    else {
        res.status(400).send({message: "Book was not found!"})
    }
})

app.listen(PORT, () => {
    console.log('server running on http://localhost:'+PORT);
})