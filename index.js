const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

app.use(express.json());

app.get('/', (req,res) => {
    res.send("Hello from Node API server Updated");
})


app.get('/api/products', async (req,res) => {

    try{

        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }
});


app.get('/api/products/:id', async (req,res) =>{
    try{

        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    }catch(error){
        res.status(500).json({message:error.message})
    }
});


app.post('/api/products', async (req,res) => {
    try{

        const product = await Product.create(req.body);
        res.status(200).json(product);

    }catch(error){

        res.status(500).json({message: error.message});
    }
    
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
 
