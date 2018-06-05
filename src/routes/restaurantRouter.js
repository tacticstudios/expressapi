import express from 'express';
import Restaurant from '../models/restaurantModel';

const restaurantRouter = express.Router();

restaurantRouter.route('/')
    .get((req,res) => {
        let id = req.query.id
        let name = req.query.name
        let tags = req.query.tags
        let address = req.query.address
        let references = req.query.references
        let phone = req.query.phone
        let web = req.query.web
        let photos = req.query.photos
        let dishes = req.query.dishes
        let rating = req.query.rating
        let tables = req.query.tables

        let openNow = req.query.openNow
        
        let query = {}

        if(tags != null) {
            let array = Array.isArray(tags) ? tags : tags.split(',')
            let obj = {
                'tags.name' : {
                    $in : array
                }
            }
            query = obj
        }

        if(dishes != null) {
            let array = Array.isArray(dishes) ? dishes : dishes.split(',')
            let obj = {
                'dishes.name' : {
                    $in : array
                }
            }
            query = obj
        }

        if(rating != null) {
            let array = rating.split(',');
            let obj = {
                rating: { $gt: Number(array[0])-0.01, $lt: Number(array[1])+0.01 }
            }
            query = obj
        }

        /*
        if(tables != null) {
            let array = Array.isArray(tables) ? tables : tables.split(',')
            let obj = {
                'tags.code' : {
                    $in : array
                }
            }
            query = obj
        }
        */

        if(openNow == 'true') {
            let currentTime = new Date()
            let currentDay = currentTime.getDay()
            let currentHours = currentTime.getHours()
            
            let dayName = ""

            if (currentDay == 0) dayName = "sunday"
            if (currentDay == 1) dayName = "monday"
            if (currentDay == 2) dayName = "tuesday"
            if (currentDay == 3) dayName = "wednesday"
            if (currentDay == 4) dayName = "thursday"
            if (currentDay == 5) dayName = "friday"
            if (currentDay == 6) dayName = "saturday"

            let obj = {
                'open.day' : dayName,
                'open.from' : { $gt: 0, $lt: currentHours + 0.1 },
                'open.to' : { $gt: currentHours, $lt: 24 }
            }
            query = obj
        }

        if(id != null) query._id = id
        if(name != null) query.name = name
        if(address != null) query.address = address
        if(references != null) query.references = references
        if(phone != null) query.phone = phone
        if(web != null) query.web = web
        console.log(query)
        Restaurant.find(query, (err, restaurants) => {
            res.json(restaurants)
        })
            //Restaurant.find({ 'tags.name': query/*tags*/ }, (err, restaurants) => {
              //  res.json(restaurants)
            //})
            
    })
    .post((req,res) => {
        console.log(req.body.title)
        let restaurant = new Restaurant(req.body);
        restaurant.save()
        res.status(201).send(restaurant)
    })

restaurantRouter.route('/restaurantById/:restaurantId')
    .get((req,res) => {
        Restaurant.findOne({"_id": req.params.restaurantId}, (err, restaurant) => {
            if(restaurant == null) res.status(404).send('No se encuentra el restaurant')
            else {
            res.json(restaurant)
            }
        })
    })

    .put((req,res) => {
        Restaurant.findOne({"_id": req.params.restaurantId}, (err, restaurant) => {
            if(restaurant == null) res.status(404).send('No se encuentra el restaurant')
            else {

            restaurant.name = req.body.name;
            restaurant.tags = req.body.tags;
            restaurant.address = req.body.address;
            restaurant.references = req.body.references;
            restaurant.phone = req.body.phone;
            restaurant.web = req.body.web;
            restaurant.photos = req.body.photos;
            restaurant.dishes = req.body.dishes;
            restaurant.rating = req.body.rating;
            restaurant.tables = req.body.tables;
            restaurant.open = req.body.open;
            restaurant.location = req.body.location;
            restaurant.save()
            res.json(restaurant)
            }
        })
    })

    .patch((req,res)=>{
        Restaurant.findOne({"_id": req.params.restaurantId}, (err, restaurant) => {
            if(restaurant == null) res.status(404).send('No se encuentra el restaurant')
            else {
                for( let p in req.body ){
                    restaurant[p] = req.body[p]
                }
            restaurant.save()
            res.json(restaurant)
            }
        })
    })

    .delete((req,res)=>{
        Restaurant.findOne({"_id": req.params.restaurantId}, (err, restaurant) => {
            
            if(restaurant == null) res.status(404).send('No se encuentra el restaurant')
            else {
            restaurant.remove(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(200).send('Restaurant eliminado')
                }
            })
            }
        })
    })

restaurantRouter.route('/top10') 
    .get((req,res) => {
        Restaurant
        .find({})
        .limit(10)
        .sort({'rating': -1})
        .exec(function (err, restaurant){
            if(restaurant == null) res.status(404).send('No hay restaurants')
            else {
            res.json(restaurant)
            }
        });
    })

export default restaurantRouter;