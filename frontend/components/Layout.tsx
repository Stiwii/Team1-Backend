import Navbar from './Navbar'
import Footer from './Footer'
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode
  // any props that come into the component
}

export default function Layout({ children, ...props }: Props) {  
  return (
    <>
      <Navbar />
        {children}
      <Footer />
    </>
  )
}

