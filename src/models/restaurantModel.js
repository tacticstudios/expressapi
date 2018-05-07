import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tagModel = new Schema({ name: 'String' });
const photoModel = new Schema({ url: 'String', description: 'String'});
const dishModel = new Schema({ name: 'String', price: 'Number'});

const restaurantModel = new Schema({
    name: String,
    tags: [tagModel],
    address: String,
    references: String,
    phone: String,
    web: String,
    photos: [photoModel],
    dishes: [dishModel]
})
export default mongoose.model('restaurants', restaurantModel)