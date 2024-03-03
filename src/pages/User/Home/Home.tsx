import React from 'react'
import { useLogout } from '../../../hooks/useLogout'
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

    const { logout } = useLogout();

  return (
    <div>
        <nav>
            <Link to='/movies'>Movies</Link>
            <button onClick={logout} className='border p-2 border-gray-900'>Logout</button>
        </nav>

        <h1>User Layout</h1>
    </div>
  )
}

export default Home