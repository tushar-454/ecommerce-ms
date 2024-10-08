import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';
import useUserInfo from './useUserInfo';

const useUserStatistics = () => {
  const { userInfo } = useUserInfo();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userStatistics', userInfo?.id],
    queryFn: async () => {
      const res = await axios.get(`/users/statistic/${userInfo?.data._id}`);
      return res.data;
    },
  });
  return {
    userStatistics: data,
    isUserStatisticsLoad: isLoading,
    isUserStatisticsError: isError,
  };
};

export default useUserStatistics;
