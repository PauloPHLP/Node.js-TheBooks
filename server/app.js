const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Book} = require('./models/book');
const {Store} = require('./models/store');

const app = express();

app.use(express.static('public'));
app.use(express.static(__dirname + '/../views/'));
app.use(express.static(__dirname + '/../views/models/book'));
app.use(express.static(__dirname + '/../views/models/store'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/books', {useNewUrlParser: true});

app.post('/api/add/store', (req, res) => {
    const store = new Store({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    });

    store.save((err, doc) => {
        if (err)
            res.status(400).send(err);
        res.status(200).send();
    })
})

app.post('/api/add/book', (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        price: req.body.price,
        stores: req.body.stores
    })

    book.save((err, doc) => {
        if (err)
            res.status(400).send(err)
        res.status(200).send();
    })
})

app.get('/api/stores', (req, res) => {
    Store.find((err, doc) => {
        if (err)
            res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/books', (req, res) => {
    Book.find().exec((err, doc) => {
        if (err)
            res.status(400).send(err);
        res.status(200).send(doc);
    })
})

app.get('/api/books/:id', (req, res) => {
    Book.findById(req.params.id, (err, doc) => {
        res.status(200).send(doc);
    })
})

app.get('/api/stores/:id', (req, res) => {
    Store.findById(req.params.id, (err, doc) => {
        res.status(200).send(doc);
    })
})

app.patch('/api/add/books/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, doc) => {
        if (err)
            res.status(400).send(err);
        res.status(200).send(doc);
    })
})

app.patch('/api/add/stores/:id', (req, res) => {
    Store.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, doc) => {
        if (err)
            res.status(400).send(err);
        res.status(200).send(doc);
    })
})

app.delete('/api/delete/books/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err)
            res.status(400).send(err);
        res.status(200).send(doc);
    })
})

app.delete('/api/delete/stores/:id', (req, res) => {
    Store.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err)
            res.status(400).send(err);
        res.status(200).send(doc);
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The Books Project is running at port ${port}`);
})