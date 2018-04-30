import express from 'express';
import bookRouter from './Routes/bookRouter';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5656;
/*const db = mongoose.connect('mongodb://msald:!mlab12%40@ds263759.mlab.com:63759/mongodbtest', { 
    uri_decode_auth: true 
    }, function(err, db) {

    });
*/

const db = mongoose.connect('mongodb://ds263759.mlab.com:63759/mongodbtest',
                 {user: 'sa-msald', pass: '!mlab12@'},
                 function(err, db) {

                });

// routes go here
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/books', bookRouter);