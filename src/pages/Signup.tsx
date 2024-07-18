import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/header/Logo';
import Container from '../components/shared/Container';
import LoginWithSocial from '../components/shared/LoginWithSocial';
import useAuth from '../Hook/useAuth';

type SignupType = {
  fullName: string;
  email: string;
  password: string;
};

const initialSignup: SignupType = {
  fullName: '',
  email: '',
  password: '',
};

const Signup = () => {
  const [signup, setSignup] = useState({ ...initialSignup });
  const navigate = useNavigate();
  const {
    loginWithGoogle,
    signupWithEmailPass,
    loading,
    setLoading,
    updateUserProfile,
  } = useAuth();

  // handle account create with email and password
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, fullName, password } = signup;
    if (!email || !password || !fullName) {
      toast.error('All fields are required');
      return;
    }
    try {
      setLoading(true);
      const res = await signupWithEmailPass(email, password);
      if (res && 'user' in res) {
        await updateUserProfile(fullName, '');
        const newUser = {
          name: fullName,
          email: email,
          phone: '00000000000',
          address: 'address',
          city: 'city',
          area: 'area',
        };
        // craete a new user save it to the database
        axios.post(`${import.meta.env.VITE_baseurl}/users/one`, newUser);
        toast.success('Signup Successfully');
        navigate('/');
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Signup Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Container>
        {/* wrapper  */}
        <div className='grid w-full place-items-center sm:h-screen'>
          <div className='w-full rounded-lg border p-5 sm:w-[560px]'>
            <div className='mb-8 grid place-items-center space-y-4'>
              <Logo />
              <h1 className='text-center text-3xl font-bold'>Signup</h1>
            </div>
            {/* Signup form inputs */}
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div className='grid gap-2'>
                <label htmlFor='fullName' className='font-bold'>
                  Full Name
                </label>
                <input
                  type='text'
                  id='fullName'
                  className='primaryInput'
                  placeholder='Jhon Dou'
                  value={signup.fullName}
                  onChange={(e) =>
                    setSignup({ ...signup, fullName: e.target.value })
                  }
                />
              </div>
              <div className='grid gap-2'>
                <label htmlFor='email' className='font-bold'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='primaryInput'
                  placeholder='example@yhaoo.com'
                  value={signup.email}
                  onChange={(e) =>
                    setSignup({ ...signup, email: e.target.value })
                  }
                />
              </div>
              <div className='grid gap-2'>
                <label htmlFor='password' className='font-bold'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  className='primaryInput'
                  placeholder='f9*&%&5'
                  value={signup.password}
                  onChange={(e) =>
                    setSignup({ ...signup, password: e.target.value })
                  }
                />
              </div>
              <button
                type='submit'
                className='primaryBtn disabled:cursor-not-allowed disabled:opacity-75'
                disabled={loading ? true : false}
              >
                {loading ? (
                  <span className='flex items-center justify-center'>
                    <svg
                      className='mr-3 h-5 w-5 animate-spin'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Sign up'
                )}
              </button>
            </form>
            {/* login with social media */}
            <LoginWithSocial loginWithGoogle={loginWithGoogle} />
            <p className='text-center'>
              You Have an account.{' '}
              <Link to={'/login'} className='text-orange-600 hover:underline'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Signup;
