export type userType = {
  _id: string;
  name: string;
  email: string;
  city: string;
  role: string;
};

import toast from 'react-hot-toast';
import { FcDeleteDatabase } from 'react-icons/fc';
import useAdminAllUsers from '../../Hook/useAdminAllUsers';
import axios from '../../utils/axios';
import Loading from '../shared/Loading';

const UsersDashboard = () => {
  const { adminAllUsers, adminAllUsersLoad, adminAllUsersError, refetch } =
    useAdminAllUsers();

  // handle user delete
  const handleDelete = async (email: string) => {
    try {
      const rusure = window.confirm('Are you sure you want to delete?');
      if (!rusure) return;
      const res = await axios.delete(`/admin/user/${email}`);
      if (res.status === 200) {
        toast.success('User deleted successfully');
        refetch();
      } else {
        toast.error('User not deleted');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full overflow-x-auto'>
      <div className='mb-5'>
        <p className='text-3xl font-bold'>Users</p>
      </div>
      <table className='w-full overflow-x-auto'>
        <thead>
          <tr className='bg-neutral-100'>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              No
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              ID
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Name
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Email
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              City
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {adminAllUsersError && (
            <tr>
              <td colSpan={4}>There was an error</td>
            </tr>
          )}
          {adminAllUsersLoad && <Loading />}
          {!adminAllUsersError &&
            !adminAllUsersLoad &&
            adminAllUsers?.data.length > 0 &&
            adminAllUsers?.data.map((user: userType, index: number) => (
              <tr
                key={Math.random()}
                className={index % 2 === 0 ? '' : 'bg-neutral-50'}
              >
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {++index}
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {user._id}
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {user.name}
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {user.email}
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {user.city}
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {user.role !== 'admin' ? (
                    <FcDeleteDatabase
                      onClick={() => handleDelete(user.email)}
                      className='cursor-pointer text-3xl'
                    />
                  ) : (
                    <FcDeleteDatabase className='cursor-not-allowed text-3xl' />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersDashboard;
