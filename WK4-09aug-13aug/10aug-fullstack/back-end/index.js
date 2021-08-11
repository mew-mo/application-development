
const express = require('express'); //includes express
const app = express(); //calls the express method
const bodyParser = require('body-parser');
const mongoose = require('mongoose');  //mongoooose for connecting and talking to mongodb
const cors = require('cors'); //for the cross origin restriction policy -- cross origin resource sharing
const bcrypt = require('bcryptjs'); //for encryption and decryption of data
const config = require('./config.json'); //config that contains my user, password and cluster name  :>
// requiring our data
const product = require('./products.json');

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
mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.${config.MONGO_CLUSTER_NAME}.mongodb.net/School?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})//;
.then(()=> console.log('db connected yeahh'))
.catch(err=> {
  console.log(`errorrr oh no DBConnectionError: ${err.message}`);
});
// ur connection string comes from mongodb cluster connect. add ur password and ur database name (case sensitive)
// remove the semicolon (i commented it out) then type then n catch for the whole responses thing
// useUnifiedTopologyis a new thing bc the old method is deprecated, you just have to slap it in there to make it work

// get method to access data from products.json
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

// listening to viewport
app.listen(port, () => console.log(`Fullstack app is listening on port ${port}`));
