import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Actors from './pages/Actors/Actors.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import Movies from './pages/Movies/Movies.tsx'
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register.tsx'
import { AuthContextProvider } from './context/AuthContext.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/',
        element: <Dashboard />
      },
      {
        path:'/actors',
        element: <Actors />
      },
      {
        path:'/movies',
        element: <Movies />
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

ReactDOM.createRoot(document.getElementById('root')!).render
(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)
