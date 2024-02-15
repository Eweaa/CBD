import './App.css'
import { useAuthContext } from './hooks/useAuthContext';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Actors from './pages/Actors/Actors.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import Movies from './pages/Movies/Movies.tsx'
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register.tsx'
import Layout from './pages/Layout/Layout.tsx';

function App() {

  const { user } = useAuthContext();
  console.log('app', user);
  
  

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout />,
      children:[
        {
          path:'/',
          element: (user ? <Dashboard /> : <Navigate to='/login'/>)
        },
        {
          path:'/actors',
          element: (user ? <Actors /> : <Navigate to='/login'/>)
        },
        {
          path:'/movies',
          element: (user ? <Movies /> : <Navigate to='/login'/>)
        },
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
  ])

  return (
    
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
