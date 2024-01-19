import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register: React.FC = () => {

    const navigate = useNavigate();

    const emailRef = useRef();
    const passRef = useRef();

    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');
    const [passError, setPassError] = useState<boolean>(false);
    const [passErrorMsg, setPassErrorMsg] = useState<string>('');
    

    const register = (e) => {

        e.preventDefault();

        const email = emailRef.current?.value;
        const pass = passRef.current?.value;
        
        if(email.length == 0 && pass.length == 0)
        {
            setError(true);
            setErrorMsg(`You didn't enter an email nor a password`)
            setEmailError(true);
            setPassError(true);
            setEmailErrorMsg(`you didn't enter an email`);
            setPassErrorMsg(`you didn't enter a password`);
        } 
        else if(email.length == 0)
        {
            setError(true);
            setErrorMsg(`you didn't enter an email`);
        }
        else if(pass.length == 0)
        {
            setError(true);
            setErrorMsg(`you didn't enter a password`);
        }
        else
        {
            if(email.includes("@") != true)
            {
                // alert('forgot @')   
                setError(true);
                setErrorMsg('Your email must include @')
            }
            if(pass.length < 6)
            {
                setError(true);
                setErrorMsg('The password is too short')
            }
            axios.post('http://localhost:5000/user/register', { Email: email, Password: pass })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
            // navigate('/');
        }
        
    }

  return (
    <div className='border rounded w-1/3 m-auto p-8'>
        {/* <form>
            <div className='mb-4'>
                <div className='flex'>
                    <input type='email' className={emailError ? 'border border-red-500 rounded' : 'border rounded'} />
                </div>
                <p className='text-red-500'>{emailError ? emailErrorMsg : <></>}</p>
            </div>
            <div className='mb-4'>
                <div className='flex'>
                    <input type='password' className={passError ? 'border border-red-500' : 'border'} minLength={4} />
                </div>
                <p className='text-red-500'>{passError ? passErrorMsg : <></>}</p>
            </div>
        </form> */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create An account
          </h2>
          <p className='text-center text-red-500' style={{display: error ? 'block' : 'hidden'}}>{errorMsg}</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ref={emailRef}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ref={passRef}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={register}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register