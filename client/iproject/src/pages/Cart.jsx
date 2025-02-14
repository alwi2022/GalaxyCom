import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../config/AxiosInstance";
import Navbar from "../Component/Navbar";

export default function Keranjang() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);
  async function fetchCart() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/carts`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCarts(data);
      console.log(data);
    } catch (error) {
        console.log(error,'fetch');
        
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

const handleUpgrade =  async (productId) =>{
    
     const {data} = await axios.get(`/payment/midtrans/initiate/${productId}`,{
        headers:{
            Authorization:`Bearer ${localStorage.access_token}`
        }
     })
     window.snap.pay(data.transactionToken, {
        onSuccess: async function(result){
          Swal.fire({
            text: "payment success!",
            icon: "success",
          });
          console.log(result);
          await axios.patch('/users/me/upgrade',{
            orderId:data.orderId

          })
        }
      })
}


async function handleUpdateQuantity(cartId, newQuantity) {
    if (newQuantity < 1) {
        Swal.fire("Error", "Quantity must be at least 1", "error");
        return;
    }

    // Optimistic update: Perbarui langsung di frontend
    setCarts((prevCarts) =>
        prevCarts.map((cart) =>
            cart.id === cartId
                ? { ...cart, quantity: newQuantity }
                : cart
        )
    );

    try {
        await axios.put(`/carts/${cartId}`, { quantity: newQuantity }, {
            headers: { Authorization: `Bearer ${localStorage.access_token}` },
        });
        Swal.fire("Success", "Quantity and price updated", "success");
        fetchCart(); 
    } catch (error) {
        Swal.fire("Error", error.response?.data?.message);
        fetchCart(); 
    }
}



  async function handleDelete(id) {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: `/carts/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Swal.fire({
        title: "Good job!",
        text: "product has been deleted",
        icon: "success",
      });
      fetchCart();
    } catch (error) {
        
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {carts.length > 0 ? (
            carts.map((cart) => (
              <div
                key={cart.id}
                className="flex items-center border-b border-gray-200 py-4"
              >
                {/* Gambar Produk */}
                <img
                  src={cart.Product.images}
                  alt={cart.Product.title}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
  
                {/* Detail Produk */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {cart.Product.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Kategori: {cart.Product.category}
                  </p>
                  <p className="text-sm">
                    Total Price:{" "}
                    <span className="font-semibold">
                      ${cart.Product.price * cart.quantity}
                    </span>
                  </p>
                  <p className="text-sm">Discount: {cart.Product.discountPercentage}%</p>
                  <p className="text-sm">Ratings: {cart.Product.rating}</p>
  
                  {/* Input Quantity */}
                  <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${cart.id}`} className="text-sm font-medium">
                      Quantity:
                    </label>
                    <input
                      id={`quantity-${cart.id}`}
                      type="number"
                      min="1"
                      value={cart.quantity}
                      onChange={(e) => handleUpdateQuantity(cart.id, e.target.value)}
                      className="border rounded w-16 p-1 ml-2"
                    />
                  </div>
                </div>
  
                {/* Aksi */}
                <div className="flex flex-col items-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-600 transition"
                    onClick={()=> handleUpgrade (cart.Product.id)}
                  >
                    Buy
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(cart.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">Your cart is empty</h2>
              <p className="text-sm text-gray-500">
                Start adding items to your cart!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
  
}
