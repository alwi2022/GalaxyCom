import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import Chatbot from "../Component/ChatBot";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/ProductSlice";
import Card from "../Component/Card";

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
console.log(products,'ini products di Home');

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <section className="py-10">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">
              Welcome to Galaxy Store
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        <Sidebar />
      </div>

      <div className="fixed bottom-4 right-4 z-50">
  <button
    className="btn-chatbot w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
    onClick={() => setIsChatbotOpen(!isChatbotOpen)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 1024 1024"
      className="w-8 h-8"
    >
      <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z" />
    </svg>
  </button>
</div>


      {isChatbotOpen && (
        <div className="fixed right-4 bottom-16 w-[350px] max-h-[80vh] overflow-auto z-50 p-4 bg-white shadow-lg rounded-md">
          <Chatbot />
        </div>
      )}
    </>
  );
}
