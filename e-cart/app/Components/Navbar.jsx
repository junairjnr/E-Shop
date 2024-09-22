
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';


export default function Navbar({ cartCount }) {

    return (
        <nav className="bg-gradient-to-r from-gray-600 to-gray-400 text-white p-4 flex justify-between items-center ">
            <div className="w-[75%] flex justify-center text-2xl font-bold font-serif">
                T-Shirt Store
            </div>

            {/* Cart Icon */}
            <div className="w-[25%] flex justify-end relative">
                <Link href={'/cart'}>
                    <ShoppingCart size={40} className="cursor-pointer" />
                </Link>
                <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                </span>
            </div>
        </nav>
    );
}

