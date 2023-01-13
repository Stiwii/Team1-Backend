import React from 'react'
import searchImage from './Icons/search.png'

const InputSearch = () => {

    return (
        <form className='search flex justify-center mb-20'>
            <div className='flex relative p-1 rounded-full w-96'>
                <input id='search' type="text" placeholder='¿Que quieres ver en tu ciudad?' className='search-input flex-1 p-2 rounded-full bg-cyan-50'/>
            </div>
        </form>
    )
}

export default InputSearch