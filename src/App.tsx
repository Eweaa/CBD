import { Outlet } from 'react-router';
import './App.css'
import Navbar from './components/Navbar/Navbar'

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
