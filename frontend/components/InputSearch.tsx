import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

const InputSearch = () => {

    return (
        <form className='search flex justify-center text-[13px] mb-20 w-[465px] h-[46px] font-normal'>
            <div className='flex relative p-1 rounded-full w-full bg-[#fff]'>
                <input id='search' type="text" placeholder='¿Qué quieres ver en tu ciudad?' className='search-input flex-1 p-2 ml-[24px] rounded-full bg-[#fff] text-[#000]'/>
                <button className='button-input rounded-full w-12'><AiOutlineSearch className='lens text-[#334155] text-2xl ml-[12px]'/></button>
            </div>
        </form>
    )
}

export default InputSearch