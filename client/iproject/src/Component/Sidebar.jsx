import React, { useContext } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { SidebarContext } from "./SidebarProvider";
import { CartContext } from "./CartContext";
import CartItem from "./CartItem";
import { Link } from "react-router";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, total } = useContext(CartContext); // Tambahkan total harga dari context

  return (
    <div
      className={`${
        isOpen ? "right-0" : "right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[30vw] xl:max-w-[25vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({cart.length})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <IoMdArrowForward className="text-xl" />
        </div>
      </div>

      {/* Cart Items */}
      <div className="mt-4 flex flex-col gap-4">
        {cart.length > 0 ? (
          cart.map((item) => <CartItem item={item} key={item.id} />)
        ) : (
          <p className="text-center text-gray-500 mt-8">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="mt-auto border-t pt-4">
          <div className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link to={'/carts'}>
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
            Proceed to Checkout
          </button>
            </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
