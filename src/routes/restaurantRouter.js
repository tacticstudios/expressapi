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
        
        let query = {}

        if(tags != null) {
            let array = tags.split(',');
            let obj = {
                'tags.name' : {
                    $in : array
                }
            }
            query = obj
        }

        if(dishes != null) {
            let array = tags.split(',');
            let obj = {
                'dishes.name' : {
                    $in : array
                }
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

restaurantRouter.route('/:restaurantId')
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

export default restaurantRouter;