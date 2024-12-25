import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) =>{
    const product = req.body; //user wil send the data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please provide all details"})
    }
    const newProduct = new Product(product)
    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Create Product:", error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }  
}

export const getProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        // If no products found, return an empty array
        if (products.length === 0) {
            return res.status(201).json({ success: false, message: "No products found" });
        }
        // Return the products in the response
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in Get All Products:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const deleteProduct = async (req, res) => {
    const { id } = req.params; // Extract the product ID from the URL parameters
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false , message:"No product with that id"});
    }
    try {
        // Try to find the product by its ID and remove it
        const deletedProduct = await Product.findByIdAndDelete(id);
        // If the product was not found, return a 404 error
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        // If deletion is successful, return a success message
        res.status(200).json({ success: true, message: "Product deleted successfully", data: deletedProduct });
    } catch (error) {
        console.error("Error in Delete Product:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params; // Extract the product ID from the URL parameters
    const product = req.body; // The data to update the product with

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false , message:"No product with that id"});
    }
    // Validate the input (optional but recommended)
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide complete data to update" });
    }  
    try {
        // Find the product by ID and update it with the new data
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        // If the product is not found, return a 404 error
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" }); }
        // If the product was successfully updated, return the updated product
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in Update Product:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}