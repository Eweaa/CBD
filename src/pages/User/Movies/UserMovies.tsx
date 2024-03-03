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
      <h1>UserMovies</h1>
      {movies.map(m => <Link to={`/movies/${m._id}`} className='block p-4'>{m?.Name}</Link>)}
    </div>
  )
}

export default UserMovies