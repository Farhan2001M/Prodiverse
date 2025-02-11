import { useState } from "react";
import { useProductStore } from "../store/Product";
import { toast } from 'react-toastify';

const CreatePage = () => {

  const [newProduct , setNewProduct] = useState({ name: "", price: "", image: "", });

  const {createProduct} = useProductStore()

  const handleSubmit = async() =>{
    const {success, message} = await createProduct(newProduct);
    if (success) {
      toast.success(message);
      setNewProduct({ name: "", price: "", image: "", });
    } else { toast.error(message); }
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 dark:text-white text-black ">
      <div className="flex flex-col gap-6 w-1/2 mx-auto my-10">
        <h1 className="text-3xl text-center">Create New Product</h1>
        <div  className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={ (e) => setNewProduct({...newProduct, name:e.target.value})}
            placeholder="Product Name"
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={(e)=>setNewProduct({...newProduct, price:e.target.value})}
            placeholder="Product Price"
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image:e.target.value})}
            placeholder="Image URL (Copy image address of any picture & paste it here)"
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
