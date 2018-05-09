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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});