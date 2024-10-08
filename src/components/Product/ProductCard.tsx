import { useEffect, useRef } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import { CartItemType } from '../../pages/ProductDetails';
import {
  getLocalStorage,
  setCartLocalStorage,
  setLocalStorage,
} from '../../utils/localStorage';

export type ProductCardType = {
  _id: number;
  name: string;
  image: string[];
  price: number;
  discount: number;
};

interface ProductCardProps {
  product: ProductCardType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const heart = useRef(null);
  const { setCarts } = useAuth();
  const navigate = useNavigate();
  // add to wishlist product function
  const addToWishList = () => {
    const productHeart = heart.current;
    if (productHeart !== null)
      (productHeart as HTMLElement).classList.toggle('heartColor');
    setLocalStorage('wishLists', product);
  };
  // add to cart product function
  const addToCart = (product: ProductCardType) => {
    const cartItem = {
      _id: product._id,
      color: 'Base',
      image: product.image[0],
      isStock: true,
      name: product.name,
      price: product.price,
      quentity: 1,
      randomId: Math.floor(Math.random() * 9999999999),
      size: 'Base',
    };
    setCartLocalStorage('carts', cartItem);
    setCarts((prev: CartItemType[] | null) => {
      if (prev === null) {
        return [cartItem];
      } else {
        return [...prev, cartItem];
      }
    });
  };

  // handle view details
  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const wishLists = getLocalStorage('wishLists') || [];
    wishLists?.map((list: ProductCardType) => {
      if (list._id === product._id) {
        const productHeart = heart.current;
        if (productHeart !== null) {
          (productHeart as HTMLElement).classList.add('heartColor');
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex h-full w-full flex-col space-y-2 place-self-center rounded-lg bg-neutral-100 p-3 shadow-lg sm:w-80'>
      <div className='group relative'>
        <img
          src={product.image[0]}
          alt={product.name}
          className='h-80 w-full rounded-lg object-cover'
        />
        <span className='absolute left-0 top-0 h-full w-full rounded-lg bg-[#00000090] opacity-0 transition-all group-hover:opacity-100'></span>
        <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-5 opacity-0 transition-all group-hover:opacity-100'>
          <Link
            to={`/product/${product._id}`}
            onClick={handleViewDetails}
            className='w-11/12 rounded-lg border-2 border-green-600 bg-white px-4 py-2 text-center font-bold text-green-600'
          >
            View Details
          </Link>
          {/* <button className='w-11/12 rounded-lg border-2 border-green-600 bg-green-600 px-4 py-2 text-center font-bold text-neutral-200'>
            Order Now
          </button> */}
        </div>
        <span
          ref={heart}
          onClick={addToWishList}
          className='absolute right-2 top-2 cursor-pointer text-white'
        >
          <FaHeart />
        </span>
      </div>
      <p className='flex-grow font-medium'>
        {product.name.length > 60
          ? `${product.name.slice(0, 60)} . . .`
          : product.name}
      </p>
      <p className='flex items-center justify-between'>
        <b>
          <small className='font-normal line-through'>{product.price}</small>{' '}
          BDT -{' '}
          {Math.floor(product.price - (product.price * product.discount) / 100)}
        </b>
        <span onClick={() => addToCart(product)}>
          <CiShoppingCart className='h-8 w-8 cursor-pointer rounded-lg bg-orange-500 p-1 text-white' />
        </span>
      </p>
    </div>
  );
};

export default ProductCard;
