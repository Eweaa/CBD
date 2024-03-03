import React, { useEffect, useState, Fragment, useRef, useMemo} from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { PlusCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import DeleteModal from '../../components/Modals/DeleteModal'
import UpdateModal from '../../components/Modals/UpdateModal'
import { Link } from 'react-router-dom'

const Actors: React.FC = () => {

  type Actor = {
    _id: string,
    Name: string
  }

  const token = localStorage.getItem('token');

  const actorName = React.useRef<HTMLInputElement>(null);

  const [actors, setActors] = useState<Actor[]>([]);
  const [selectedActor, setSelectedActor] = useState<string>('');
  const [openC, setOpenC] = useState<boolean>(false)
  const [openD, setOpenD] = useState<boolean>(false)
  const [openU, setOpenU] = useState<boolean>(false)
  const data = useMemo(() => ({actors}), [actors]);

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    axios.get('http://localhost:5000/actors', { headers: {"Authorization" : `Bearer ${token}`}}).then(res => {
      console.log(res.data);
      setActors(res.data);
    });
  }, [actors.length]);

  
  const createActor = () => {
    axios.post('http://localhost:5000/actors/', { Name: actorName.current?.value}, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(() => {
      setOpenC(false);
      const newActor = actorName.current?.value;
      const data = [...actors, newActor];
      setActors(data);
    })
    .catch((err) => alert(`Something Went Wrong ${err}`))
  }

  const setDeletedActor = (id: string) => {
    setOpenD(true);
    setSelectedActor(id);
  }
  
  const deleteActor = (id: string) => {
    axios.delete('http://localhost:5000/actors/' + id, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(() => {
      setOpenD(false);
      const data = actors.filter(datum => datum._id !== id || datum._id === null)
      setActors(data);
    })
    .catch((err) => alert(`Something Went Wrong ${err}`))
  }

  const updateActor = (id: string) => {
    axios.put('http://localhost:5000/actors/' + id, { headers: {"Authorization" : `Bearer ${token}`}});
    setOpenU(true);
  }

  return (
    <div>
      <h1>Actors</h1>
      <div className='flex justify-between'>
        <input type="text" placeholder="Search" className="border-2 rounded p-1"/>
        <button className="rounded mx-1 p-1 bg-blue-500 text-white" onClick={() => setOpenC(true)}>Add Actor</button>
      </div>

      <table border={4} className='border w-full mt-2'>

        <thead>
          <tr>
            <td className='p-2'>Name</td>
            <td className='p-2'>Actions</td>
          </tr>
        </thead>

        <tbody>
          {actors.map((actor, i) => (
          <tr className='border' key={i}>
            {/* <Link to={`/actor/${actor._id}`}> */}
              <td className='p-2'>{actor.Name}</td>
              <td className='p-2'>
                <button className="rounded mx-1 p-1 bg-yellow-500 text-white" onClick={() => setOpenU(true)}>
                  <PencilSquareIcon className='h-6 w-6'/>
                </button>
                <button className="rounded mx-1 p-1 bg-red-600 text-white" onClick={() => setDeletedActor(actor._id)}>
                  <TrashIcon className='h-6 w-6'/>
                </button>
              </td>
            {/* </Link> */}
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
                        Create Actor
                      </Dialog.Title>
                      <div className="mt-2">
                        <label>Name</label>
                        <input type='text' className='border' ref={actorName}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:ring-4 transition sm:ml-3 sm:w-auto"
                    onClick={() => createActor()}
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

      <DeleteModal status={openD} entity={selectedActor} closeFunc={setOpenD} delFunc={deleteActor} type='Actor' />
      <UpdateModal status={openU} func={setOpenU}/>
    </div>
  )
}
export default Actors