import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tagModel = new Schema({ name: 'string' });

const restaurantModel = new Schema({
    name: String,
    tags: [tagModel],
    address: String,
    references: String,
    phone: String,
    web: String
})
export default mongoose.model('restaurants', restaurantModel)