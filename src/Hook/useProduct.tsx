import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';

const useProduct = (productId: string | undefined) => {
  const {
    data: product,
    isLoading: productLoad,
    isError: productError,
    refetch,
  } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await axios.get(`/users/product/${productId}`);
      return res.data.data;
    },
  });
  return {
    product,
    productLoad,
    productError,
    refetch,
  };
};

export default useProduct;
