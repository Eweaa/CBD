import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
        <Navbar />
        <div className='p-16'>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout