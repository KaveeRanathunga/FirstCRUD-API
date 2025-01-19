const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./Routes/product.route.js');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))


//routes
app.use('/api/products',productRoute);
 


app.get('/', (req,res) => {
    res.send("Hello from Node API server Updated");
})




 
mongoose.connect("mongodb+srv://priyanjithranathunga:nXx9tCMkM5qQbxHY@crudapi.c3dgq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=CRUDAPI").then(() => {

   
    console.log("Connected to the Database!");
    app.listen(3000,()=>{

        console.log('server is running on port 3000')
    });
})

.catch(() => {
    console.log("Connection Faild");
})
 
