import React from 'react'
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className='bg-amber-400 flex text-xl font-semibold py-4 justify-between align-middle px-4'>
    <Link to="/" className="hover:text-amber-800 transition-colors">
        <p>RateDukaan</p>
    </Link>
    <div className='align-middle flex'>
        <input type="text" name="search" id="search" className='text-md  p-0.5 text-center border-2 border-black rounded-2xl' placeholder='Gupta Sweets' />
        <button type='submit' className='px-4 rounded-full hover:bg-amber-200'><Search/></button>
    </div>
    <ul className='flex gap-8'>
        <li><Link to="/" className="hover:text-amber-800 transition-colors">Home</Link></li>
        <li><Link to="/about" className="hover:text-amber-800 transition-colors">About</Link></li>
        <li><Link to="/login" className="hover:text-amber-800 transition-colors">Login</Link></li>
    </ul>
    
    </div>
  )
}
