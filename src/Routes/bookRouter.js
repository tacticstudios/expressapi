import express from 'express';
import Book from '../models/bookModel';
const bookRouter = express.Router();
bookRouter.route('/')
    .get((req,res) => {
        /*
        let id = null
        let title = null

        if (req.query.id != null) id = req.query.id
        if (req.query.title != null) title = req.query.title
        
        let cadena = ""
        if (id != null) cadena = "'_id': " + id
        if (title != null) cadena = "'title': " + title

        console.log(cadena)

        Book.find({cadena}, (err, books) => {
        */
        let id = req.query.id
        let title = req.query.title
        
        let query = {}

        if(id != null) query._id = id
        if(title != null) query.title = title

        Book.find(query, (err, books) => {
            res.json(books)
        })
    })
    .post((req,res) => {
        console.log(req.body.title)
        let book = new Book(req.body); // edited line
        book.save()
        res.status(201).send(book)
    })

bookRouter.route('/:bookId')
.get((req,res) => {
    Book.findOne({"_id": req.params.bookId}, (err, book) => {
        if(book == null) res.status(404).send('No se encuentra el libro')
        else {
        res.json(book)
        }
    })
})

/*
.get((req, res) => {
    res.json(req.book)
}) // end get Books/:bookId
*/
/*
.put((req,res) => {
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.save()
    res.json(req.book)
})
*/

.put((req,res) => {
    Book.findOne({"title": req.params.bookId}, (err, book) => {
        if(book == null) res.status(404).send('No se encuentra el libro')
        else {
        book.title = req.body.title;
        book.author = req.body.author;
        book.save()
        res.json(book)
        }
    })
})

/*
.patch((req,res)=>{
    if(req.body._id){
        delete req.body._id;
    }
    for( let p in req.body ){
        req.book[p] = req.body[p]
    }
    req.book.save()
    res.json(req.book)
})//patch
*/

.patch((req,res)=>{
    Book.findOne({"title": req.params.bookId}, (err, book) => {
            /*
        if(req.body._id){
            delete req.body._id;
        }*/
        if(book == null) res.status(404).send('No se encuentra el libro')
        else {
        
        for( let p in req.body ){
            book[p] = req.body[p]
        }
        book.save()
        res.json(book)
        }
    })
})//patch

/*
.delete((req,res)=>{
    req.book.remove(err => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(204).send('removed')
        }
    })
})
*/

.delete((req,res)=>{
    Book.findOne({"title": req.params.bookId}, (err, book) => {
        
        if(book == null) res.status(404).send('No se encuentra el libro')
        else {
        book.remove(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(200).send('Libro eliminado')
            }
        })
        }
    })
})

export default bookRouter;