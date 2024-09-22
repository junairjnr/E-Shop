
import { useRouter } from 'next/navigation';
import useCartStore from '../store';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
// import { images } from '../images/page';
import black from '../../assets/black-polo.webp'
import Image from 'next/image';

export default function ProductCard({ product }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [loading, setLoading] = useState(false);

    const successMessage = (product) => {
        if (product) {
            toast.success(
                <div>
                    Successfully added <span className="font-bold text-base font-serif">{product.name}</span> to the cart.
                </div>
            );
            setLoading(false);
        }
    }

    const router = useRouter();
    const goToCart = () => {
        router.push("/cart");
    }

    const handleAddToCart = () => {
        setLoading(true);
        addToCart(product);
        setTimeout(() => {
            successMessage(product);
        }, 1000);
    }

    const isOutOfStock = product.quantity === 0

    return (
        <div
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
        >
            <Image
                src={black}
                alt={product.name}
                // width={280}
                // height={150}
                className="w-full h-48 object-cover shadow-lg rounded-md" />
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                <p className="text-xl font-bold text-green-600 mt-2">₹{product.price}</p>
                <p className="text-gray-600">Color: {product.color}</p>
                <p className="text-gray-600">Gender: {product.gender}</p>
                <p className="text-gray-600">Available: {product.quantity}</p>
                <div className='flex flex-row gap-1'>
                    <button
                        className="mt-4 w-full bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-500 disabled:opacity-50 flex items-center justify-center"
                        onClick={handleAddToCart}
                        disabled={loading || product.quantity === 0}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="animate-spin mr-2" size={16} />
                                Loading...
                            </>
                        ) : isOutOfStock ? (
                            "Not in Stock"
                        ) : (
                            "Add to Cart"
                        )}
                    </button>
                    <button
                        className="mt-4 w-full bg-yellow-600 text-white py-1 px-3 rounded-lg hover:bg-yellow-500"
                        onClick={goToCart}
                    >
                        View Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
