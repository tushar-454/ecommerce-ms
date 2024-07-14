import { createBrowserRouter } from 'react-router-dom';
import Root from '../layout/Root';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OrderSummary from '../pages/OrderSummary';
import ProductDetails from '../pages/ProductDetails';
import ProductFilter from '../pages/ProductFilter';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import Wishlists from '../pages/Wishlists';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'product/filter',
        element: <ProductFilter />,
      },
      {
        path: 'product/:id',
        element: <ProductDetails />,
      },
      {
        path: 'wishlist',
        element: <Wishlists />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'order',
        element: <OrderSummary />,
      },
      {
        path: 'profile',
        element: <Profile />,
        children: [
          {
            index: true,
            element: <p>Profile</p>,
          },
          {
            path: 'order',
            element: <p>Order</p>,
          },
          {
            path: 'shipping',
            element: <p>shiping address</p>,
          },
          {
            path: 'review',
            element: <p>reviews</p>,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default router;
