const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017'
var db;

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.post('/movies', (req,res) => {
    
    db.collection('movies').insertOne(req.body, (err) => {
        if(err) console.log(err);
    });

    console.log('new movie added to movies collection');
    res.redirect('/');
});

app.get('/', (req,res) => {

    db.collection('movies').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', {movies: result})
      })
});

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if(err) return console.log(err);
    db = client.db('movies_db');
    app.listen(3000, () => {
        console.log('listening on 3000')
      });
});