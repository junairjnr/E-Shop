"use client"

import useCartStore from '../store';
import { toast } from 'react-hot-toast';
import black from '../../assets/black-polo.webp'
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, ArrowLeft } from 'lucide-react';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCartStore();

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const removedMessage = (name) => {
        if (name) {
            toast.success(`Successfully Removed "${name}" `);
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-5 rounded-md shadow-md border mb-5">
            <div className='w-full flex justify-start items-center'>
                <div className='w-[30%] h-full flex justify-start items-center '>

                    {cart.length > 0 &&
                        (<Link href={"/dashboard"}>
                            <h1 className="text-lg  mb-8 flex items-center"><ArrowLeft size={20} />Back</h1>
                        </Link>
                        )}
                </div>
                <div className='w-[70%] flex justify-start items-center'>
                    <h1 className=" text-3xl font-bold mb-8 text-center px-12">Your Cart</h1>
                </div>
            </div>


            {cart.length > 0 ? (
                <div className='w-full h-full rounded-md'>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between mb-6">
                            <Image src={black} alt={item.name} className="w-24 h-24 object-cover rounded-md shadow-xl" />
                            <div className="flex-1 ml-6">
                                <h2 className="text-xl font-bold">{item.name}</h2>
                                <p>₹{item.price} x {item.quantity}</p>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className={`bg-gray-200 text-gray-700 rounded-full p-1 ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <Minus />
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        readOnly
                                        className="border border-gray-300 rounded-lg px-3 py-2 w-[67px] text-center"
                                    />
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="bg-gray-200 text-gray-700 rounded-full p-1"
                                    >
                                        <Plus />
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    removeFromCart(item?.id);
                                    removedMessage(item?.name);
                                }}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="text-right mt-8">
                        <h2 className="text-2xl font-bold">Total: ₹{getTotalPrice()}</h2>
                        <button className="bg-green-600 text-white py-2 px-6 mt-4 rounded-lg hover:bg-green-500">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="text-center text-xl">Your cart is empty.</p>
                    <Link href={"/dashboard"}>
                        <p className="text-center text-xl text-blue-600 cursor-pointer underline">
                            <strong>Click Here</strong> to Add your Products.
                        </p>
                    </Link>
                </div>
            )}
        </div>
    );
}
