import React from 'react'
import { Outlet } from 'react-router-dom';
import UserNavbar from '../../../components/Navbar/UserNavbar/UserNavbar';

const Home: React.FC = () => {


  return (
    <div>
      <UserNavbar />
      <Outlet />
    </div>
  )
}

export default Home