
const express = require('express'); //includes express
const app = express(); //calls the express method
const bodyParser = require('body-parser');
const cors = require('cors'); //for the cross origin restriction policy -- cross origin resource sharing
const bcrypt = require('bcryptjs'); //for encryption and decryption of data

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
