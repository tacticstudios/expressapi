import express from 'express';
import Book from '../models/bookModel';
const bookRouter = express.Router();
bookRouter.route('/')
    .get((req,res) => {
        Book.find({}, (err, books) => {
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
.get((req, res) => {
    res.json(req.book)
}) // end get Books/:bookId 
.put((req,res) => {
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.save()
    res.json(req.book)
})
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

export default bookRouter;