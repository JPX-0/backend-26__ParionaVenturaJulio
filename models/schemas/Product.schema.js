import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true }
});

export default ProductSchema;