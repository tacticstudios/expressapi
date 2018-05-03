import express from 'express';
import Restaurant from '../models/restaurantModel';

const restaurantRouter = express.Router();

restaurantRouter.route('/')
    .get((req,res) => {
        let id = req.query.id
        let nombre = req.query.title
        let rangoPrecios = req.query.rangoPrecios
        let tags = req.query.tags
        let direccion = req.query.direccion
        let referencia = req.query.referencia
        let telefono = req.query.telefono
        let web = req.query.web
        
        let query = {}

        if(id != null) query._id = id
        if(nombre != null) query.nombre = nombre
        if(rangoPrecios != null) query.rangoPrecios = rangoPrecios
        if(tags != null) query.tags = tags
        if(direccion != null) query.direccion = direccion
        if(referencia != null) query.referencia = referencia
        if(telefono != null) query.telefono = telefono
        if(web != null) query.web = web

        Restaurant.find(query, (err, restaurants) => {
            res.json(restaurants)
        })
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
            restaurant.nombre = req.body.nombre;
            restaurant.rangoPrecios = req.body.rangoPrecios;
            restaurant.tags = req.body.tags;
            restaurant.direccion = req.body.direccion;
            restaurant.referencia = req.body.referencia;
            restaurant.telefono = req.body.telefono;
            restaurant.web = req.body.web;
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