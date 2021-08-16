
const express = require('express'); //includes express
const app = express(); //calls the express method
const bodyParser = require('body-parser');
const mongoose = require('mongoose');  //mongoooose for connecting and talking to mongodb
const cors = require('cors'); //for the cross origin restriction policy -- cross origin resource sharing
const bcrypt = require('bcryptjs'); //for encryption and decryption of data
const config = require('./config.json'); //config that contains my user, password and cluster name  :>
// requiring our data
const product = require('./products.json');
const Product = require('./models/products.js');
// the const name has to match the export label :0
const User = require('./models/users.js');

const port = 3000;

app.use((req,res,next) => {
  console.log(`${req.method} request ${req.url}`);
  next();
  // go to next automatically
}) //use ends here

app.use(bodyParser.json()); //calling body parser method
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors()); // calling cors

app.get('/',(req,res)=> res.send('hello from the backend'));
// sends to the browser!!

// https://mongoosejs.com/docs/connections.html is where this code is from
// after cluster0 is the lil thing u3mpr that identifies u. like a customer code
mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.${config.MONGO_CLUSTER_NAME}.mongodb.net/Sample?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})//;
  // changing the name from School to Sample.
.then(()=> console.log('db connected yeahh'))
.catch(err=> {
  console.log(`errorrr oh no DBConnectionError: ${err.message}`);
});
// ur connection string comes from mongodb cluster connect. add ur password and ur database name (case sensitive)
// remove the semicolon (i commented it out) then type then n catch for the whole responses thing
// useUnifiedTopologyis a new thing bc the old method is deprecated, you just have to slap it in there to make it work

// post method to write or create a document in mongodb

app.post('/addProduct', (req,res)=>{
  const dbProduct = new Product({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    price: req.body.price,
    image_url: req.body.imageUrl
  });
  // save this to the database and notify the users if it has saved
  dbProduct.save().then(result=> {
    res.send(result);
  }).catch(err=> res.send(err));
  // sends result to mongodb and shows up in the database --> the product has been written in postman under body
  // make sure postman stuff is set to json, and POST not get lol. then itll push ur things to the relevant mongodb database
})
// app.post ends

// retrieve objects or documents from the database
app.get('/allProductsFromDB', (req, res) => {
  Product.find()
    .then(result => {res.send(result);})
})

// patch is to update the details of the objects (/:id to target a specific product!!)
app.patch('/update/:id', (req, res) => {
  const idParam = req.params.id;
  // comes from the user when they request
  Product.findById(idParam,(err, product) => {
    if (product['user_id'] == req.body.userId) {
      const updatedProduct = {
        name: req.body.name,
        price: req.body.price,
        image_url: req.body.imageUrl
        // so the body in question here is pulling from the postman body when you type in there to update, it makes sense
      }
      Product.updateOne({_id: idParam}, updatedProduct)
        .then(result => {res.send(result)})
        .catch(err => res.send(err))
        // if this is updated, THEN,
    } else {
      res.send('Error: Product not found');
    }
  })
})
//patch ends

// delete a product from database
app.delete('/delete/:id', (req, res) => {
  const idParam = req.params.id;
  Product.findOne({_id: idParam}, (err, product) => {
    if (product) {
      Product.deleteOne({_id: idParam}, err => {
        res.send('deleted')
      });
    } else {
      res.send('not found');
    }
  })
  .catch(err => res.send(err));
});
//delete ends

// get method to access data from products.json (locally)
// routing to the endpoint... /allProducts on the end of your browser url is how to make the request !! that makes sense... wow!! this is literally building the endpoint, this one is local though.
app.get('/allProducts', (req,res)=> {
  res.json(product);
  // json data will be the response when this is requested, much like an api. /allProducts is like an endpoint.
  // when allProducts endpoint is requested, it responds with product.
})
// remember app is express!! its what we called it :)

// in the browser you tag this in the end, but instead of id you put a NUMBER-- will return the coinciding item with that numerical id :)
app.get('/products/p=:id', (req,res)=> {
  const idParam = req.params.id; //requesting the id parameter.. method will apply to id, storing in the user defined name.
  // loops through the request.
  for (let i = 0; i < product.length; i++) {
    if(idParam.toString() === product[i].id.toString()) {
      res.json(product[i]);
    }
  }
})

// USER METHODS ----------------------------------------
// 16 aug.

// register a new user
app.post('/registerUser', (req, res) => {
  // checking if user is found in the db already
  User.findOne({username: req.body.username}, (err, userResult) => {
    if (userResult) {
      res.send('username already taken. pls use a different username.');
    } else {
      const hash = bcrypt.hashSync(req.body.password);
      // using encryption method to provide security
      // encrypts the user's password
      // hashing is a technique to encrypt the pass
      const user = new User({
        _id: new mongoose.Types.ObjectId,
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      user.save().then(result => {
        res.send(result);
      }).catch(err => res.send(err));
    }
  })
  // checks if user is existing or not
})

// view all users
app.get('/allUsers', (req, res) => {
  User.find().then(result => {
    res.send(result);
  })
  // if you only want one, findOne. if you want all, just find.
});

// user login
app.post('/loginUser', (req, res) => {
  User.findOne({username: req.body.username}, (err, userResult) => {
    if (userResult) {
      if (bcrypt.compareSync(req.body.password, userResult.password)) {
        // comparing with the exising pass
        // when the password matches, send forth!
        res.send(userResult);
      } else {
        res.send('not authorized');
      } // inner if ENDS
    } else {
        res.send('user not found. please register :)')
    } // outer if ENDs
  }) // findone ENDS
}); //post eNDS

// listening to viewport
app.listen(port, () => console.log(`Fullstack app is listening on port ${port}`));
