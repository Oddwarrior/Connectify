import React from 'react'
import { BiSearch } from 'react-icons/bi'
import FollowerCard from './FollowerCard'
import TrendingCard from './TrendingCard'

const Search = () => {
    return (
        <div className='flex  items-center gap-2 rounded-xl text-sm w-full  bg-background-secondary dark:bg-background-seondary-dark p-2 px-4 '>
            <span className=' text-text-secondary'><BiSearch size="20px" /></span>
            <input type='text' placeholder='search' className=' focus:outline-none  bg-background-secondary dark:bg-background-seondary-dark ' />
        </div>
    )
}

const RightBar = () => {
    return (
        <div className='hidden md:flex flex-col items-center  gap-2 p-2 pr-4 pt-4 h-screen  border-background-secondary dark:border-gray-700 w-full'>
            <Search />
            <FollowerCard />
            <TrendingCard />
        </div>
    )
}


export default RightBar