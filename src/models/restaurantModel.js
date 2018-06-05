import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tagModel = new Schema({ name: 'String' });
const photoModel = new Schema({ url: 'String', description: 'String'});
const dishModel = new Schema({ name: 'String', price: 'Number', image: 'String'});
const tableModel = new Schema({ code: 'String', capacity: 'Number', available: 'Boolean'});
const openModel = new Schema({ day: 'String', from: 'Number', to: 'Number'});
const locationModel = new Schema({ latitude: 'Number', longitude: 'Number'});

const restaurantModel = new Schema({
    name: String,
    tags: [tagModel],
    address: String,
    references: String,
    phone: String,
    web: String,
    photos: [photoModel],
    dishes: [dishModel],
    rating: Number,
    tables: [tableModel],
    open: [openModel],
    location: [locationModel]
})
export default mongoose.model('restaurants', restaurantModel)