import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Movie: React.FC = () => {

    const [movie, setMovie] = useState();
    const token = localStorage.getItem('token');
    const url = window.location.href;
    const id = url.split('movies/')[1];

  useEffect(() => {
    axios.get(`http://localhost:5000/movies/${id}`, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      console.log(res.data);
      setMovie(res.data);
    });
  }, []);

  return (
    <div className='p-16'>

        <div className="bg-white border-b-2 pb-4">
            <div>

                <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">

                {/* <div className="lg:col-span-2 lg:col-start-1"> */}
                <div className="lg:col-span-1 lg:col-start-1">
                    {/* <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg"> */}
                    <div className="h-96 overflow-hidden rounded-lg">
                        <img 
                            src={movie?.Img}
                            alt={movie?.Img}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>

                <div className="mt-4 lg:row-span-2 lg:mt-0 lg:col-span-2">

                    <div className="lg:col-span-2">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{movie?.Name}</h1>
                    </div>

                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            {/* <p className="text-base text-gray-900">{product.description}</p> */}
                        </div>
                    </div>

                </div>

                </div>
            </div>
        </div>

        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-5xl font-bold py-4">Cast</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {movie?.Actors?.map((product) => (
                        <Link to={`/actor/${product._id}`} key={product.id} href={product.href} className="group">
                            {/* <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"> */}
                            <div className="w-64 h-64 overflow-hidden rounded-lg bg-gray-200">
                                <img
                                src={product.Img}
                                alt={product.Img}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700 font-bold">{product.Name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Movie