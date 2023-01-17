import Navbar from './Navbar'
import Footer from './Footer'
import { ReactNode } from 'react';
import Encabezado from './Encabezado';
import InputSearch from './InputSearch';

interface Props {
  children?: ReactNode
  // any props that come into the component
}

export default function Layout({ children, ...props }: Props) {  
  return (
    <>
      <Encabezado />
      <Navbar />
        {children}
      <Footer />
    </>
  )
}

