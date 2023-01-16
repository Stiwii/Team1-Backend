import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import cosas from '/images/rectangle.png'

const Footer = () => {

  return (
    <footer>
      <img src="/images/rectangle21.png" alt='footer-image'/>
      <img src={`cosas`} alt='footer-image'/>
    </footer>
  )
}

export default Footer