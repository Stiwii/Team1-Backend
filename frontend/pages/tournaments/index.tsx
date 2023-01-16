import React from 'react'
import CathegoryOne from '../../components/Buttons/CathegoryOne'
import Like from '../../components/Buttons/Like'
import NextOne from '../../components/Buttons/NextOne'
import NextTwo from '../../components/Buttons/NextTwo'
import InputSearch from '../../components/InputSearch'
import PersonIcon from '../../components/PersonIcon'

const Tournaments = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-primary-blackLight w-max rounded-2xl m-auto p-[50px] mt-[50px]'>
      <InputSearch/>
      <div className='flex gap-2 items-center justify-center bg-slate-300 p-[40px] rounded-2xl w-max'>
        <NextOne/>
        <NextTwo/>
        <CathegoryOne/>
        <Like/>
        <PersonIcon/>
      </div>
    </div>
  )
}

export default Tournaments