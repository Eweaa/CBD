import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const product = {
    description:
      `Brian Cox is an Emmy Award-winning Scottish actor. He was born on June 1, 1946 in Dundee, Scotland, to Mary Ann Guillerline Cox, maiden surname McCann, a spinner, and Charles McArdle Campbell Cox, a shopkeeper and butcher. His father was of Irish ancestry and his mother was of Irish and Scottish descent.

      Cox first came to attention in the early 1970s with performances in numerous television films. His first big break was as Dr. Hannibal Lecter in Manhunter (1986). The film was not overly successful at the box office, although Cox's career prospects and popularity continued to develop. Through the 1990s, he appeared in nearly 20 films and television series, as well as making numerous television guest appearances. More recently, Cox has had roles in some major films, including The Corruptor (1999), The Ring (2002) and X-Men 2 (2003). He was awarded Commander of the Order of the British Empire in the 2003 Queen's New Year's Honours List for his services to drama.
      `
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const Actor: React.FC = () => {

    const url = window.location.href;
    const id = url.split('actor/')[1];
    console.log(id)
    console.log(url)
    const token = localStorage.getItem('token');
    const [actor, setActor] = useState<Actor>();

    useEffect(() => {
        axios.get(`http://localhost:5000/actors/${id}`, { headers : {"Authorization" : `Bearer ${token}`}})
        .then(res => {
            console.log(res.data);
            setActor(res.data);
        })
        .catch()
    }, [])

  return (
    <div>
        <div className="bg-white">
            <div>

                <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">

                {/* <div className="lg:col-span-2 lg:col-start-1"> */}
                <div className="lg:col-span-1 lg:col-start-1">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img 
                            src={actor?.Img}
                            alt={actor?.Img}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>

                <div className="mt-4 lg:row-span-2 lg:mt-0 lg:col-span-2">

                    <div className="lg:col-span-2">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{actor?.Name}</h1>
                    </div>

                    <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                        <p className="text-base text-gray-900">{product.description}</p>
                    </div>

                    </div>

                </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Actor