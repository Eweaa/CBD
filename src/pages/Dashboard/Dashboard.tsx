import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard: React.FC = () => {

  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/dashboard', { headers: {"Authorization" : `Bearer ${token}`}})
    .then((res) => {
      console.log(res.data)
      setData(res.data);
    })
  }, [])

  return (
    <div>

      <div className='flex justify-around'>
        <div className='border rounded-md p-4'>
          <h1 className='font-bold'>{data[0]?.length} Actors</h1>
        </div>
        <div className='border rounded-md p-4'>
          <h1 className='font-bold'>{data[1]} Movies</h1>
        </div>
      </div>

      <div className='py-4'>
        <h1 className='font-bold text-3xl py-4'>Recently Added Actors</h1>
        <div className='flex justify-between'>
          {data[0]?.last?.map(d => (
          <div key={d._id} className='border p-2 w-1/5 rounded-md'>
            <h1 className='pb-2 font-bold text-xl'>{d.Name}</h1>
            <div className='flex gap-1'>
              <button className='w-1/2 bg-yellow-500 rounded-md font-bold text-white'>Edit</button>
              <button className='w-1/2 bg-red-600 rounded-md font-bold text-white'>Delete</button>
            </div>
          </div>
          ))}
        </div>
      </div>

      <div className='py-4'>
        <h1 className='font-bold text-3xl py-4'>Recently Added Movies</h1>
        <div className='flex justify-between'>
          {data[0]?.last?.map(d => (
          <div key={d._id} className='border p-2 w-1/5 rounded-md'>
            <h1 className='pb-2 font-bold text-xl'>{d.Name}</h1>
            <div className='flex gap-1'>
              <button className='w-1/2 bg-yellow-500 rounded-md font-bold text-white'>Edit</button>
              <button className='w-1/2 bg-red-600 rounded-md font-bold text-white'>Delete</button>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
    
  )
}

export default Dashboard