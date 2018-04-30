import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bookModel = new Schema({
    title: String,
    author: String
})
export default mongoose.model('books', bookModel)