
import express from 'express';
import dotenv from 'dotenv';
import path, { dirname } from "path";
import { connectDB } from './config/db.js';

import productRoutes from './routes/product.routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


app.use(express.json()); // Allows us to accept JSON data in the req.body

app.use('/api/products', productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist" )));
    app.get("*" , (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend" , "dist" , "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server started on http://localhost'+ PORT);
});

app.get("/", async (req, res) => {
    res.send("API is running...");
});
