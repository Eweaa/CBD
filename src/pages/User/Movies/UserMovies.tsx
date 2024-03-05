import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const UserMovies = () => {

  const [movies, setMovies] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/movies', { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      console.log(res.data);
      setMovies(res.data);
    });
  }, []);

  return (
    <div>
      {/* {movies.map(m => <Link to={`/movies/${m._id}`} className='block p-4'>{m?.Name}</Link>)} */}
      <ul role="list" className="divide-y divide-gray-100">
      {movies.map((movie) => (
        <li key={movie._id} className="flex justify-between gap-x-6 py-5">
          <Link to={`/movies/${movie._id}`}>
            <div className="flex min-w-0 gap-x-4 px-4 items-center">
              <img className="h-48 w-32 flex-none rounded-md bg-gray-50" src={movie.Img} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{movie.Name}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default UserMovies