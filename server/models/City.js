import mongoose from 'mongoose'
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

export const City = mongoose.model('City', citySchema)