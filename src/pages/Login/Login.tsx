import React from 'react'
import { useNavigate } from 'react-router'

const Login: React.FC = () => {

  const navigate = useNavigate();

  const login = () => {
    navigate('/')
  }

  return (
    <div className='border w-1/3 m-auto'>
        <h1 className='text-center'>Login</h1>
        
        <div className='flex'>
            <label>Email</label>
            <input type='email' className='border'/>
        </div>
        
        <div className='flex'>
            <label>Password</label>
            <input type='password' className='border'/>
        </div>

        <button onClick={login} className='bg-blue-500 rounded text-white p-2'>Login</button>
    </div>
  )
}

export default Login