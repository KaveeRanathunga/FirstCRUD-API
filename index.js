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



//Get all products
app.get('/api/products', async (req,res) => {

    try{

        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }
});



//Get one by one
app.get('/api/products/:id', async (req,res) =>{
    try{

        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    }catch(error){
        res.status(500).json({message:error.message})
    }
});



//create Products
app.post('/api/products', async (req,res) => {
    try{

        const product = await Product.create(req.body);
        res.status(200).json(product);

    }catch(error){

        res.status(500).json({message: error.message});
    }
    
})

//update a product

app.put('/api/products/:id', async(req,res) =>{
    try{

        const {id} = req.params;

        const product = await Product.findByIdAndUpdate(id,req.body);

        if(!product){
            return res.status(404).json({message: "Product nor found"});

        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    }catch(error){
        res.status(500).json({message: error.message});
    }
});


app.delete('/api/products/:id', async (req,res) => {
    try{

        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){

           return res.status(404).json({message:"product not found"});

        }

        res.status(200).json({message:"Product deleted successfully"});


    }catch(error){
        res.status(500).json({message:error.message});
    }
});


mongoose.connect("mongodb+srv://priyanjithranathunga:nXx9tCMkM5qQbxHY@crudapi.c3dgq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=CRUDAPI").then(() => {

   
    console.log("Connected to the Database!");
    app.listen(3000,()=>{

        console.log('server is running on port 3000')
    });
})

.catch(() => {
    console.log("Connection Faild");
})
 
