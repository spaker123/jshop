const path            = require('path');

const express         = require('express');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');

const errorController = require('./controllers/error');
const mongoConnect    = require('./util/database').mongoConnect;
const User            = require('./models/user');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'));
 
app.use((req, res, next) => {
   User.findById("5bfca353fe37673f7c8c1161")
     .then(user => {
       req.user = user;
       next();
     })
     .catch(err => console.log(err));
  //next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//mongoConnect(() => {
  //console.log(client);
//  if () {

 // }
  //app.listen(3000);
//});


mongoose.connect(process.env.MONGO_CONNECT_DEV)
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'jlin',
        email: 'jlin@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    } else {
      console.log("fe2");
    }
  });
  
  app.listen(3005);
}).catch(err => {
  console.log(err);
});
