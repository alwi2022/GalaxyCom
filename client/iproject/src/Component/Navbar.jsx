import { Link, useNavigate } from "react-router";
import React, { useContext } from "react";
import { SidebarContext } from "./SidebarProvider";
import { BsBag } from "react-icons/bs";

export default function Navbar() {
  const { isOpen, setIsOpen } = useContext(SidebarContext);

  const navigate = useNavigate();
  function logout(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="navbar bg-white shadow-lg px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <Link to={"/"} className="text-2xl font-bold text-blue-600">
          Galaxy Com
        </Link>
      </div>

      <ul className="flex items-center space-x-6">
        <li>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex items-center text-gray-700 hover:text-blue-500"
          >
            <BsBag className="text-2xl" />
            <span className="ml-2">Cart</span>
          </div>
        </li>

        <li>
          <Link to={'/best-sellers'}>
          <div className="text-2xl font-bold text-black-100">
      Best sellers
          </div>
          
          </Link>
        </li>
        {/* <li>
          <Link
            to={"/ca"}
            className="text-gray-700 hover:text-blue-500 text-lg font-medium"
          >
            Home
          </Link>
        </li> */}
      </ul>

      {/* Logout Section */}
      <div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
