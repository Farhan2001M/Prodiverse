import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/Product";
import Productcard from '../components/Productcard'
const HomePage = () => {

  const {fetchProducts , products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  return (
    <div className="p-6 dark:bg-gray-900 bg-gray-100 dark:text-white text-black ">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl text-center">Showing Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Ensure products is an array before using .map() */}
          {(products || []).map((product) => (
            <Productcard key={product._id} product={product}/> 
          ))}
        </div>
      </div>

      {products.length === 0 && (
        <div>
          <h2 className="text-2xl text-center my-7">No products found 😥 <Link to="/create" className="text-blue-500 font-bold hover:underline">Create a product</Link> </h2>
        </div>
      )}

    </div>
  );
};

export default HomePage;
