import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from '../config/db.js';
import productRoutes from '../routes/product.routes.js';

dotenv.config();

const app = express();
const router = express.Router();
// Setup middleware
app.use(express.json());
app.use('/api/products', productRoutes);

// Handle production static files
if (process.env.NODE_ENV === "production") {
    // Replace __dirname with a solution using import.meta.url
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
}

router.get("/", async (req, res) => {
  try {
    console.log("Fetching products...");  // Log to check if it's hitting this route
    const products = await Product.find();
    console.log("Products fetched:", products);  // Log fetched products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);  // Log any errors
    res.status(500).json({ message: "Server Error" });
  }
});

// Basic endpoint
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Connect DB
connectDB();

// Export the Express app as a Vercel serverless function
export default app;



// import express from 'express';
// import dotenv from 'dotenv';
// import path, { dirname } from "path";
// import { connectDB } from '../config/db.js';
// import productRoutes from '../routes/product.routes.js';

// dotenv.config();

// const app = express();
// const router = express.Router();
// // Setup middleware
// app.use(express.json());
// app.use('/api/products', productRoutes);

// // Handle production static files
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
//     });
// }

// router.get("/", async (req, res) => {
//   try {
//     console.log("Fetching products...");  // Log to check if it's hitting this route
//     const products = await Product.find();
//     console.log("Products fetched:", products);  // Log fetched products
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);  // Log any errors
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Basic endpoint
// app.get("/", (req, res) => {
//     res.send("API is running...");
// });

// // Connect DB
// connectDB();

// // Export the Express app as a Vercel serverless function
// export default app;
