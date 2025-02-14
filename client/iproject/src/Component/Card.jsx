import { useContext } from "react";
import Swal from "sweetalert2";
import axios from "../config/AxiosInstance";
import { BsStarFill, BsCartPlus } from "react-icons/bs";
import { CartContext } from "./CartContext";
import { Link } from "react-router";

export default function Card({ product }) {
  const { addToCart } = useContext(CartContext);

  async function handleAdd(productId) {
    try {
      const { data } = await axios({
        method: "POST",
        url: `/carts/${productId}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Product added to cart.",
        icon: "success",
      });
      addToCart(product, productId);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden group">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
        <img
          src={product.images}
          alt={product.title}
          className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          </Link>
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xl font-bold text-black-500">${product.price}</p>
          <div className="flex items-center gap-1 text-yellow-400">
            <BsStarFill />
            <span>{product.rating}</span>
          </div>
        </div>
        <button
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={() => handleAdd(product.id)}
        >
          <BsCartPlus className="inline-block mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
}



