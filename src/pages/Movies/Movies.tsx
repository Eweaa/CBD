import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movies: React.FC = () => {

  type Movie = {
    id:string,
    Name: string,
    date: Date
  }

  let [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/movies').then(res => {
      setMovies(res.data);
    });
  }, []) 


  return (
    <div>
        <h1>Movies</h1>
        <input type="text" placeholder="Search" className="border-2 rounded p-1"/>
        <ul role="list" className="divide-y divide-gray-100">
          {movies.map(movie => 
            <li key={movie.id} className='flex justify-between items-center gap-x-6 py-5'>
            <div className="flex min-w-0 gap-x-4 items-center">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{movie.Name}</p>
              </div>
            </div>
            <div className="">
              <button className="rounded mx-1 p-1 bg-blue-500 text-white">Edit</button>
              <button className="rounded mx-1 p-1 bg-red-600 text-white">Delete</button>
            </div>
          </li>
          )}
        </ul>
    </div>
  )
}

export default Movies