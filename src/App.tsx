import { Outlet } from 'react-router';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Table from './components/Table/Table';

function App() {

  return (
    <div>
      <Navbar />
      <div className='p-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
