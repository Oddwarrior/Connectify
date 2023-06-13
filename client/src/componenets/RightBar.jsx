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
        <div className='hidden md:flex flex-col items-center p-6 gap-2 pt-8 h-screen border dark:border-gray-700 w-full'>
            <Search />
            <FollowerCard />
            <TrendingCard />
        </div>
    )
}


export default RightBar