import './App.css'
import { useAuthContext } from './hooks/useAuthContext';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Actors from './pages/Actors/Actors.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import Movies from './pages/Movies/Movies.tsx'
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register.tsx'
import Layout from './pages/Layout/Layout.tsx';
import Actor from './pages/Actor/Actor.tsx';
import Home from './pages/User/Home/Home.tsx';
import UserMovies from './pages/User/Movies/UserMovies.tsx';
import Movie from './pages/User/Movie/Movie.tsx';

function App() {

  const { user } = useAuthContext();
  console.log('app', user);
  let theUser = user;
  let Role = theUser?.Role;
  console.log(Role);


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
      element: (user == null ? <Login /> : <Navigate to='/'/>)
    },
    {
      path: '/register',
      element: (user == null ? <Register /> : <Navigate to='/'/>)
    },
  ])

  const userRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/movies',
      element: <UserMovies />
    },
    {
      path: '/movies/:id',
      element: <Movie />
    },
    {
      path:'/actor/:id',
      element: (Role == false ? <Actor /> : <Navigate to='/login'/>)
    },
    {
      path: '/login',
      element: (user == null ? <Login /> : <Navigate to='/'/>)
    },
    {
      path: '/register',
      element: (user == null ? <Register /> : <Navigate to='/'/>)
    },
  ])

  return (
    
    <div>
      <RouterProvider router={Role ? router : userRouter}/>
    </div>
  )
}

export default App
