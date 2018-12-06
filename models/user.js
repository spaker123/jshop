const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, 
      quantity:  { type: Number,                                required: true} }]
  }
});

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIdex(cp => {
     return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    
  } 

}

module.exports = mongoose.model('User', userSchema);




/** 
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email) {
     this.name = username;
     this.email
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({_id: new ObjectId(userId)});
  }

}

module.exports = User;
**/