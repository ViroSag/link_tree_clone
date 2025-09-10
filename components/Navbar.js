import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-white flex justify-between w-[80vw] fixed top-10 right-[10vw] rounded-full p-5 px-7">
    <div className="logo flex gap-20 items-center">
        <img loading="eager" src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg" alt="" className="h-8 nav-desktop-logo"></img>
        <ul className='flex gap-10'>
            <li>Products</li>
            <li>Templates</li>
            <li>Marketplace</li>
            <li>Learn</li>
            <li>Pricing</li>
        </ul>
    </div>
    <div className='flex gap-2'>
        <button className="login bg-gray-400 p-4 rounded-lg font-bold">Log in</button>
        <button className="signup bg-gray-900 text-white p-4 rounded-full font-bold">Sign up free</button>
    </div>
      
    </nav>
  )
}

export default Navbar
