import React, { useState, useEffect, Fragment, useRef } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import DeleteModal from '../../components/Modals/DeleteModal';

const Movies: React.FC = () => {

  type Movie = {
    _id:string,
    Name: string,
    ReleaseDate: string
  }

  const searchWord = useRef<HTMLInputElement>(null);
  const movieName = useRef<HTMLInputElement>();
  const movieDate = useRef<HTMLInputElement>();
  const cancelButtonRef = useRef(null);

  let [movies, setMovies] = useState<Movie[]>([]);
  let [movieList, setMovieList] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string>('');
  const [openD, setOpenD] = useState<boolean>(false);
  const [openC, setOpenC] = useState<boolean>(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/movies', { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      setMovies(res.data);
      setMovieList(res.data)
      // movieList = [...res.data];
      // console.log(movieList)
    });
  }, []);

  const setDeletedMovie = (id: string) => {
    setOpenD(true);
    console.log(id);
    setSelectedMovie(id);
  }

  const deleteMovie = (id: string) => {
    if(id == null)
    {
      const data = movies.filter(datum => datum._id !== id || datum._id === null) 
      setMovies(data);
      setOpenD(false);
      return
    }
    axios.delete('http://localhost:5000/movies/' + id, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(() => {
      const data = movies.filter(datum => datum._id !== id || datum._id === null) 
      setMovies(data);
      setOpenD(false);
    })
    .catch(err => alert(`Something Went Wrong ${err}`))
  }

  const createMovie = () => {    
    axios.post('http://localhost:5000/movies/', { Name: movieName?.current?.value, ReleaseDate: movieDate?.current?.value}, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(() => {
      console.log('movie added');
      const data = [...movies, {Name: movieName?.current?.value, ReleaseDate: movieDate?.current?.value}];
      setMovies(data);
      setOpenC(false);
    })
    .catch(err => console.log(err))
  }

  const search = () => {
    if(searchWord.current!.value.length === 0 && movies.length === 0)
    {
      console.log('a1a1a')
      console.log(movieList)
      setMovies(movieList);
    }
    else 
    {
      let searchResult = movies.filter(m => m.Name.toLowerCase().includes(searchWord.current!.value.toLocaleLowerCase()));
      setMovies(searchResult);
    }
  }

  return (
    <div>
        <h1>Movies</h1>
        <div className='flex justify-between'>
          <input type="text" placeholder="Search" className="border-2 rounded p-1" ref={searchWord} onChange={search} />
          <button className='bg-blue-500 rounded text-white mx-1 p-1' onClick={() => setOpenC(true)}>
            Create Movie
          </button>
        </div>

      <table className='border w-full mt-2'>
        
        <thead>
          <tr>
            <td className='p-2'>Name</td>
            <td className='p-2'>Release Date</td>
            <td className='p-2'>Actions</td>
          </tr>
        </thead>

        <tbody>
          {movies.map(movie => (
          <tr key={movie._id} className='border'>
            <td className='p-2'>{movie.Name}</td>
            <td className='p-2'>{new Date(movie.ReleaseDate).toDateString()}</td>
            <td className='p-2'>
              <button className="rounded mx-1 p-1 bg-yellow-500 text-white">Edit</button>
              <button className="rounded mx-1 p-1 bg-red-600 text-white" onClick={() => setDeletedMovie(movie._id)}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>
              
      </table>

      <Transition.Root show={openC} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenC}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PlusCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Create Movie
                        </Dialog.Title>
                        <div className="mt-2">
                          {/* <p className="text-sm text-gray-500">
                            Are you sure you want to delete this actor?
                          </p> */}
                          <div>
                            <label>Name</label>
                            <input type='text' className='border rounded' ref={movieName}/>
                          </div>
                          <div>
                            <label>Date</label>
                            <input type='date' className='border rounded' ref={movieDate}/>
                          </div>
                          {/* <div>
                            <label>Actors</label>
                            <div className='border border-gray-200'>
                              <input type='search'/>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:ring-2 sm:ml-3 sm:w-auto"
                      onClick={() => createMovie()}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpenC(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>


      <DeleteModal status={openD} entity={selectedMovie} closeFunc={setOpenD} delFunc={deleteMovie} type='Movie'/>
    </div>
  )
}

export default Movies