const mongoose = require('mongoose');
const proSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    unique: true
  },
  product_image: {
    type: String,
    required: true
  },
  product_cost: {
    type: Number,
    required: true
  },
  subimages: {
    type: Array,
  },
  rating: {
    type: Number
  },
  ratingCount: {
    type: Number
  },
  description: {
    type: String
  },
  feature: {
    type: String
  },
  color_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color"
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Product', proSchema);