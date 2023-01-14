import React from 'react'
import Link from 'next/link'

const Navbar = ({}) => {
  return (
    <nav>
        <div className="Logo">
            <h1>Para Cuando?</h1>
        </div>
       <Link href='/'>Home </Link> 
       <Link href='/login/Login'>Login </Link> 
       <Link href='/SignUp/SignUp'>Sign Up </Link> 
       <Link href='/Details/Details/[eventId]'>Details </Link> 
       <Link href='/Brands/Brands'>Brands </Link> 
       <Link href='/Profile/Profile'>Profile </Link> 
       <Link href='/Create/Create'>Create </Link> 
    </nav>
  )
}

export default Navbar