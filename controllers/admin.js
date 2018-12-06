const mongodb = require('mongodb');
const Product = require('../models/product');
const multer = require('multer');
const upload = multer( { dest: 'uploads/' } )
const request = require('request');
const fs      = require('fs')
const AWS     = require('aws-sdk');


const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path:      '/admin/add-product',
    editing:   false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title       = req.body.title;
  const imageUrl    = req.body.imageUrl;
  const price       = req.body.price;
  const description = req.body.description;

  //const product_img = req.body.product_img;
 
  console.log("url: " + imageUrl);
 /** 
  const requestSettings = {
    method: 'GET',
    url: imageUrl,
    encoding: null
  };

  request(requestSettings, function(error, response, body) {
       console.log("ewf2"); 
  });
**/

request(
  { method: 'GET', 
    uri: imageUrl,
    encoding: null
  }
, function (error, response, body) {
   var encodedImage = new Buffer(body, 'binary');
   var params = {
       Body:  encodedImage, 
       Bucket: "jjshop", 
    };

    var s3 = new AWS.S3({
     accessKeyId: process.env.ACCESSKEY,
     secretAccessKey: process.env.SECRETACCESSKEY
    });

    s3.putObject(params, function(err, data) {
           if (err) {
             console.log("error: ");
             console.log(err, err.stack); // an error occurred
           }  else {
             console.log("you fixed it!");
             console.log(data);           // successful response    
           }
           process.exit();    
     });
  

  }
)
.on('data', function(data) {
  // decompressed data as it is received
  //console.log('decoded chunk: ' + data)
})
.on('response', function(response) {
  // unmodified http.IncomingMessage object
  response.on('data', function(data) {
    // compressed data as it is received
   // console.log('received ' + data.length + ' bytes of compressed data')
  })
})


    
  

 // const product = new Product({
 //   title: title, price: price, description: description, imageUrl: imageUrl,
 //   userId: req.user._id
 // });

  //process.exit();

  //product
  //  .save()
  //  .then(result => {
    //  console.log('Created Product');
    //  console.log(result);
    //  res.redirect('/admin/products');
   // })
   // .catch(err => {
    //  console.log(err);
    //});
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  //req.user
  //  .getProducts({ where: { id: prodId } })
  Product.findById(prodId)
    .then(product => {
   //   const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
   const prodId = req.body.productId;
   const updatedTitle = req.body.title;
   const updatedPrice = req.body.price;
   const updatedImageUrl = req.body.imageUrl;
   const updatedDesc = req.body.description;
   
  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;  
      return product.save();
    }).then(result => {
      console.log("updated product!!");
      console.log(result); 
      res.redirect('/admin/products');
    }).catch(err => {
      console.log(err);
    }); 
      
  // const product = new Product(
  //   updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, new ObjectId(prodId));
   //Product.findById(prodId)
   // .then(product => {
   //    product.title = updatedTitle;
   //    product.price = updatedPrice;
   //    product.description = updatedDesc;
    //   product.imageUrl = updatedImageUrl;
   //    return true;
       //return product.save();
   // product.save()  
   //  .then(result => {
    //   console.log('UPDATED PRODUCT!');
    //   res.redirect('/admin/products');
     //})
     //.catch(err => console.log(err));
 };

 exports.getProducts = (req, res, next) => {
   Product.find()
     .then(products => {
       res.render('admin/products', {
         prods: products,
         pageTitle: 'Admin Products',
         path: '/admin/products'
       });
     })
     .catch(err => console.log(err));
 };

 exports.postDeleteProduct = (req, res, next) => {
   const prodId = req.body.productId;
  // Product.findById(prodId)
  Product.findByIdAndRemove(prodId)
    .then(() => {
       console.log('DESTROYED PRODUCT');
       res.redirect('/admin/products');
     })
    .catch(err => console.log(err));
 };
