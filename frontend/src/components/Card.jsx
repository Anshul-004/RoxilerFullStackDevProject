import React from 'react'

export const Card = () => {

  return (
    <div className='m-10 flex justify-center'>
    <div className='card-body flex flex-col justify-around border p-4 border-black rounded-2xl overflow-scroll w-72 h-64 text-center bg-gray-300'>
        <p>
        <p className='text-xl font-bold'>Dukkan ka Naam</p>
        <p className='text-md'>69, Lala Lajpat Rai Marg, New Delhi</p></p>
        <p className='tex-lg font-bold'>Rating 4/5</p>

        <button className='border border-black rounded-2xl p-1 mt-3 hover:bg-gray-400'>Add Rating</button>
        <button className='border border-black rounded-2xl p-1 mt-3 hover:bg-gray-400'>Edit Rating</button>
    </div>
    </div>
  )
}
