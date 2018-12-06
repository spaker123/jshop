const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

/** 
const mongodb = require('mongodb');
const getDb   = require('../util/database').getDb;

class Product {
  constructor(title, price, desc, imageUrl, id) {
    this.title    = title;
    this.price    = price;
    this.desc     = desc;
    this.imageUrl = imageUrl; 
    this._id      = id ? new mongodb.ObjectID(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp; 
    if (this._id) {
     // Update the product
      dbOp = db.collection('products').updateOne(
        { _id:  new mongodb.ObjectId(this._id) }, 
        { $set: this }
      );
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then(result => {
         console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
    
  }

  static fetchAll() {
    const db = getDb();
    return db
    .collection('products')
    .find()
    .toArray()
    .then(products => {
      console.log(products);
      return products;
    })
    .catch(err => {
      console.log(err);
    });
  }

  static findById(prodId) {
    const db = getDb();

    console.log("id: " + prodId);

    return db
    .collection('products')
    .find({_id: new mongodb.ObjectID(prodId)})
    .next()
    .then(product => {
      console.log("kkkk: " + product);
      return product;
    })
    .catch(err => {
      console.log(err);
    });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products')
    .deleteOne({ _id: new mongodb.ObjectId(prodId) })
    .then(res => {
      console.log('Dleted');
    })
    .catch(err => {
      console.log('Deleted');
    });
    
  }

}

 
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
**/