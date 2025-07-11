import React from 'react'
import { Search } from 'lucide-react';

export const Navbar = () => {
  return (
    <div className='bg-amber-400 flex text-xl font-semibold py-4 justify-between align-middle px-4'>
    <p>RateDukaan</p>
    <div className='align-middle flex'>
        <input type="text" name="search" id="search" className='text-md  p-0.5 text-center border-2 border-black rounded-2xl' placeholder='Gupta Sweets' />
        <button type='submit' className='px-4 rounded-full hover:bg-amber-200'><Search/></button>
    </div>
    <ul className='flex gap-8'>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Login</a></li>
    </ul>
    
    </div>
  )
}
