import React from 'react'

export const Card = ({shopData}) => {

  return (
    <div className='flex justify-center'>
      <div className='card-body flex flex-col justify-between border-2 p-6 border-amber-600 rounded-2xl w-72 h-64 text-center bg-amber-50 shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <div className='space-y-2'>
          <p className='text-xl font-bold text-gray-800'>{shopData.name}</p>
          <p className='text-sm text-gray-600'>{shopData.address}</p>
        </div>
        
        <p className='text-lg font-bold text-amber-700'>Rating 4/5</p>

        <div className='space-y-2'>
          <button className='w-full border-2 border-amber-600 bg-amber-600 text-white rounded-xl py-2 px-4 font-medium hover:bg-amber-700 hover:border-amber-700 transition-colors duration-200'>
            Add Rating
          </button>
          <button className='w-full border-2 border-amber-600 text-amber-600 rounded-xl py-2 px-4 font-medium hover:bg-amber-600 hover:text-white transition-colors duration-200'>
            Edit Rating
          </button>
        </div>
      </div>
    </div>
  )
}
