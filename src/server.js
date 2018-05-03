import express from 'express';
import restaurantRouter from './routes/restaurantRouter';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5656;

const db = mongoose.connect('mongodb://ds113700.mlab.com:13700/restaurant',
                 {user: 'sa-msald', pass: '!mlab12@'},
                 function(err, db) {

                });

// routes go here
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/restaurants', restaurantRouter);