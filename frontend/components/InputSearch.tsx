import React from 'react'
import searchImage from './Icons/search.svg'

const InputSearch = () => {

    return (
        <form className='search flex justify-center mb-20 w-96'>
            <div className='flex relative p-1 rounded-full w-full'>
                <input id='search' type="text" placeholder='¿Que quieres ver en tu ciudad?' className='search-input flex-1 p-2 rounded-full bg-cyan-50 bi'/>
            </div>
        </form>
    )
}

export default InputSearch