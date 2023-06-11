import React from 'react'
import { BiSearch } from 'react-icons/bi'
import FollowerCard from './FollowerCard'
import TrendingCard from './TrendingCard'

const Search = () => {
    return (
        <div> <div className='flex justify-center items-center gap-2 rounded-full w-full bg-background-dark p-1 px-4 '>
            <span className=' text-text-secondary'><BiSearch size="20px" /></span>
            <input type='text' placeholder='search' className=' focus:outline-none  bg-background-dark text-text-primary' />
        </div></div>
    )
}

const RightBar = () => {
    return (
        <div className='flex flex-col items-center p-8 gap-2 pt-8 h-screen border w-ful'>
            <Search />
            <FollowerCard />
            <TrendingCard />
        </div>
    )
}


export default RightBar