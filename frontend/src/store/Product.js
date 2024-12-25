import { create } from "zustand";

export const useProductStore = create((set) => ({
  products:[],
  setProducts: (products) => set({products}),

  createProduct: async (newProduct) =>{
    if(!newProduct.name || !newProduct.price || !newProduct.image){
      return {success: false , message:"Please fill in all fields."}
    }
    const res = await fetch("/api/products",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newProduct)
    });

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data]}) )
    return {success: true , message:"Product cretaed successfully."}
  },

  // Function to fetch products from the API
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      
      // Check if the response is successful
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      // Assuming `data.data` contains the product list
      set({ products: data.data || [] });
    } catch (error) {
      console.error(error);
      set({ products: [] }); // Handle error by setting products to empty array
    }
  },

  deleteProduct:async (pid) =>{
    const res = await fetch(`/api/products/${pid}`,{
      method: "DELETE",
    });
    const data = await res.json();
    if(!data.success) return {success:false , message: data.message};
    set(state => ({products: state.products.filter(product => product._id !==pid)})) // Update ui without needing refresh
    return {success:true , message: data.message};
  },

  updateProduct: async (pid, updatedProduct) => {
    // Check if any field is empty
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? { ...product, ...updatedProduct } : product ),
    }));

    return { success: true, message: "Product updated successfully." };
  },

}))   