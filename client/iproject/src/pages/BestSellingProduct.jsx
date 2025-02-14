import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { data, useNavigate } from "react-router";
import Navbar from "../Component/Navbar";
import { BsStarFill } from "react-icons/bs";

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?sortBy=rating&order=desc"
        );
        console.log(response.data);

        setProducts(response.data.products);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-3xl font-bold text-center mb-10">
          Best Selling Items
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {products.length === 0 ? (
            <p className="text-center col-span-full">No products found</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="card w-72 bg-white shadow-xl rounded-lg"
              >
                <figure className="px-10 pt-10">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-60 object-cover rounded-lg"
                  />
                </figure>
                <div className="card-body text-center">
                  <h2 className="card-title">{product.title}</h2>
                  <div className="flex items-center gap-2 mb-4 text-yellow-400">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <span className="flex items-center">{product.rating}</span>
                    <span className="text-gray-500 text-sm">
                      | {product.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="text-xl font-semibold">
                    Price: ${product.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
