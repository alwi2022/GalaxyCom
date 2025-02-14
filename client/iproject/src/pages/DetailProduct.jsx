import { useContext, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "../config/AxiosInstance";
import { BsStarFill, BsCartPlus } from "react-icons/bs";
import Navbar from "../Component/Navbar";
import { CartContext } from "../Component/CartContext";

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `products/${id}`,
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setProduct(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      }
    }

    fetchProduct();
  }, [id]);

  async function handleAddToCart(productId) {
    try {
      const { data } = await axios({
        method: "POST",
        url: `carts/${productId}`,
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
      navigate("/");
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Failed to add product to cart.",
      });
    }
  }

  if (!product) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.images}
              alt={product.title}
              className="w-full max-w-md object-cover rounded-md shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4 text-yellow-400">
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <span className="flex items-center">
                {product.rating}
              </span>
              <span className="text-gray-500 text-sm">
                | {product.category}
              </span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Price */}
            <div className="mb-6">
              <span className="text-2xl font-bold text-black-600">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-red-500 ml-2">
                  ({product.discountPercentage}% OFF)
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => handleAddToCart(product.id)}
              >
                <BsCartPlus className="inline-block mr-2" /> Add to Cart
              </button>
              <Link
                to="/"
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
