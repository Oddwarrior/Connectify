import React from 'react'
import { BiSearch } from 'react-icons/bi'
import SuggestionCard from './SuggestionCard'
import TrendingCard from './TrendingCard'

const Search = () => {
    return (
        <div className='flex  items-center gap-2 rounded-full text-sm w-full  bg-background-secondary dark:bg-background-seondary-dark p-2 px-4  dark:bg-opacity-40 bg-opacity-40 '>
            <span className=' text-text-secondary '><BiSearch size="20px" /></span>
            <input type='text' placeholder='search' className=' focus:outline-none  bg-background-secondary dark:bg-background-seondary-dark dark:bg-opacity-0 bg-opacity-0 ' />
        </div>
    )
}

const RightBar = () => {
    return (
        <div className='hidden md:flex flex-col items-center  gap-3 p-3 pt-4 h-screen  border-background-secondary dark:border-gray-700 w-full'>
            <Search />
            <SuggestionCard />
            <TrendingCard />
        </div>
    )
}


export default RightBar