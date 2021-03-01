//Enable the .env file, therefore add a env property to process object.
// Recommend to require it at the top of the file 

require('dotenv').config();
// Midlewares

// Configure body-parser so you cna retrieve values from the req.body, it not the req.body will be undefined.

const bodyParser = require('body-parser');

//Require the session for saving data and giving a user a unigque exprience.
 const session = require('express-session');

 //User cors for enable cross origin requests

 const  cors = require('cors')
 // Controllers 
 // These are how we define endpoints
 // Note can name all the variable anything you want I am just operating on convention or best practice.
 //Set your admin funtionality
 const adminController = require('./controllers/admin_controller');
 // Set your cloudinary functionality

 const cloudinaryController = require('./controllers/cloudinary_controller');

 //Set your user functionality
 const userController = require('./controllers/user_controller')
 // Set your products functionality.

 const productsController = require('./controllers/prodducts_controller');
 //Import your mongoose module to connect to your mongodb database instance using it's connection string.
 const mongoose = require('mongoose');
 
 // Import your express server 

 const express = require('express');
 //Set Instance of the express server to a variable

 const app = express();
 // Define the your Port will be running server on.
 //Note: Make sure the port is the same as the proxy.
 const PORT = 5000;
 // Connect the mongoose to the database using it's connect method.

 mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser:true}, (err)=>{
     if(err){
         console.log('Database Error------'. err);
     }
     console.log('Connected to database successfuly')
 })
// For intilizing the req.body. If the middleware is not used, the req.body is undefined.
 app.use(bodyParser.json())

 // For storing cookies  for the user.

 app.use(session({
     // Create a secret for the cookies store it in .eve file 
     //Secret can be anything.
     secret: process.env.SESSION_SECTRET,
     //  this for resaving the cookies false, if true can cause a memory leak.
     resave: false,

     // saveUnitialized best false, unless connect to a database
     saveUninitialized: false,
     cookie: {
         // The max age of cookie
         maxAge: 1000*60*60*24*14
     }

 }))

 // Allow cross origin requests. 
 app.use(cors());

 // Set timeout
 setTimeout(()=>{
     // All our endpoints.
     // Read the  user's sesion 
 app.get('/api/user-data', userController.readUserData);
 //Add a item to cart.
 app.post('/api/user-data/cart', userController.addToCart);
 //Remove a item from the cart.
 // Use request parameter to remove item from cart since you are looking  specfic item in cart.
 app.delete('/api/user-data/cart/:id', userController.removeFromCart);
 // When user login 

 app.post('/api/login', userController.login)

 // No Need For a Register Since You are using Auth0.
 // Just Need  a login, since you are logging from your social media provider no need to register, only looks if a user already has a account.

 // When the user logouts
  
 app.post('/api/logout', userController.logout)

 // Product Endpoints
 // Getting all the products
 app.get('/api/products', productsController.readAllProducts)
 // Getting the specific product
 // Use a request parameter, since retrieving a specified product..
 app.get('./api/products/:id', productsController.readProduct)

 // Adming Endpoints

 // Get the admin users.

 app.get('/api/users', adminController.getAdminUsers);
 // When  a admin creates a product. No need for request parameter in this case. Since we are inserting data to database.
 app.post('/api/products', adminController.createProduct);

 // When a admin update current product. Need request parameter since updating a specific product based on the id.
 app.put('/api/products/:id', adminController.updateProduct);
 
 //When a admin deletes a product, need an id to specify a product to delete.
 app.delete('/api/products/:id', adminController.deleteProduct)
 //Then listen on the port.
 },200)

 
 app.listen(PORT, ()=>console.log('Listening on Port:', Port))