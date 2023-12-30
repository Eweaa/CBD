const people = [
    {
      name: 'Jeremy Strong'
    },
    {
      name: 'Michael Foster'
    },
    {
      name: 'Dries Vincent'
    },
    {
      name: 'Lindsay Walton'
    },
    {
      name: 'Courtney Henry'
    },
    {
      name: 'Tom Cook',
    },
  ]

  type props = {
    name: string
  }
  
const Table:React.FC<props> = (data) => {
  
  return(
    <div>
            <input type="text" placeholder="Search" className="border-2 rounded p-1"/>
            <ul role="list" className="divide-y divide-gray-100">
                {data.map((person) => (
                <li key={person.name} className="flex justify-between items-center gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4 items-center">
                    {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                    </div>
                    </div>
                    <div className="">
                    <button className="rounded mx-1 p-1 bg-blue-500 text-white">Edit</button>
                    <button className="rounded mx-1 p-1 bg-red-600 text-white">Delete</button>
                    </div>
                </li>
                ))}
            </ul>
        </div>
  )
}

export default Table;

  // export default function Table(props: data[]) {

    

  //   return (
  //       <div>
  //           <input type="text" placeholder="Search" className="border-2 rounded p-1"/>
  //           <ul role="list" className="divide-y divide-gray-100">
  //               {people.map((person) => (
  //               <li key={person.name} className="flex justify-between items-center gap-x-6 py-5">
  //                   <div className="flex min-w-0 gap-x-4 items-center">
  //                   {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
  //                   <div className="min-w-0 flex-auto">
  //                       <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
  //                   </div>
  //                   </div>
  //                   <div className="">
  //                   <button className="rounded mx-1 p-1 bg-blue-500 text-white">Edit</button>
  //                   <button className="rounded mx-1 p-1 bg-red-600 text-white">Delete</button>
  //                   </div>
  //               </li>
  //               ))}
  //           </ul>
  //       </div>
  //   )
  // }
  