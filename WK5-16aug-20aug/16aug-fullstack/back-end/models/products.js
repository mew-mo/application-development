const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  image_url: String,
  //  _id is the primary key that uniquely identifies a record, even if two documents are the same, they will have different primary keys. the _ means its been auto-generated :>
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  // the user logged on is the one tied to / who has the power to manipulate the product.
})

module.exports = mongoose.model('Product', productSchema);
// exporting it by giving it a name, labelled as Product. it's like a return. now you can use it wherever outside.
