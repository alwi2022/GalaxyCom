import React from "react";
import { Link } from "react-router";
Link
const CartItem = ({item})=>{
    return (
        <div className="flex">
            <div className="w-full min-h-[150] flex items-center gap-x-4">
                <div>
                    <Link to={'/carts'}>
                    <img src={item.images} className="max-w-[80px]" alt="" />
                    <h1>{item.title}</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartItem