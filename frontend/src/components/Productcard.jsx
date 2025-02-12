import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useProductStore } from '../store/Product';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();

  const [showModal, setShowModal] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast.success(message);
    } else { toast.error(message); }
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    if (success) {
      setShowModal(false); // Close the modal after successful update
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // Modal content as a separate function
  const renderModal = () => (
    <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg w-full max-w-md mx-4 md:w-1/3">
        <h2 className="text-xl md:text-2xl text-center mb-4 dark:text-white font-bold">
          Edit Your Product
        </h2>

        <input
          type="text"
          name="name"
          value={updatedProduct.name}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          placeholder="Product Name"
          className="p-2 mb-4 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="text"
          name="price"
          value={updatedProduct.price}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
          placeholder="Product Price"
          className="p-2 mb-4 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="text"
          name="image"
          value={updatedProduct.image}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
          placeholder="Image URL"
          className="p-2 mb-4 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />

        <div className="flex flex-col md:flex-row justify-between gap-2 mt-4">
          <button
            onClick={handleUpdateProduct}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
          >
            Update
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" w-full mx-auto max-w-sm rounded overflow-hidden shadow-lg dark:bg-gray-800 bg-white dark:text-white text-black transform transition-all hover:translate-y-[-10px] hover:shadow-2xl hover:bg-slate-200 dark:hover:bg-gray-600">
      {/* Image */}
      <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />

      {/* Footer with name, price, and action buttons */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black dark:text-white">{product.name}</h2>
          <button
            onClick={() => setShowModal(true)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <FiEdit size={20} />
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <p className="text-lg text-gray-600 dark:text-gray-300">${product.price}</p>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <FiTrash size={20} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && ReactDOM.createPortal(renderModal(), document.body)}
    </div>
  );
};

export default ProductCard;

