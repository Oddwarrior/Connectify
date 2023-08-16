import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { MdVerified } from 'react-icons/md'
import SuggestionCard from './SuggestionCard'
import TrendingCard from './TrendingCard'
import axios from 'axios'
import Card from './Card'
import default_dp from "../assets/default_dp.png"
import { Link } from 'react-router-dom'

const Search = () => {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    const handleSearch = async (e) => {
        setSearch(e.target.value);
        let res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/user/searchUser?search=" + search);
        setResult(res?.data?.users);
        console.log(result);
    }
    return (
        <div className='w-full  relative'>
            <div className='flex  items-center gap-2 rounded-full text-sm  bg-background-secondary dark:bg-background-seondary-dark p-2 px-4  dark:bg-opacity-40 bg-opacity-40 '>
                <span className=' text-text-secondary '><BiSearch size="20px" /></span>
                <input type='text' placeholder='search'
                    className=' focus:outline-none  bg-background-secondary dark:bg-background-seondary-dark dark:bg-opacity-0 bg-opacity-0 '
                    onChange={handleSearch}
                />
            </div>

            {search && <Card className="m-2 z-20 absolute max-h-60 overflow-auto bg-background  dark:bg-opacity-100 shadow-md p-2">
                {result.map((user) => (
                    <div key={user?._id} className=' w-full rounded-xl p-2   flex justify-between items-center gap-4 text-sm'>
                        <Link to={`/user/${user?.username}`} className='flex gap-2'>
                            <img className='w-10 h-10 object-cover rounded-full bg-background-dark' src={user?.profilePicture ?? default_dp} alt='dp' />
                            <div>
                                <div className='font-semibold flex  capitalize items-center gap-2'>
                                    <h1>{user?.fname + " " + user?.lname}</h1>
                                    <h1>{user?.username == 'shashankjagtap' && <MdVerified color='#48cae4' />}</h1></div>
                                <span className=' text-text-secondary-dark text-sm'>@{user?.username}</span>
                            </div>
                        </Link>

                    </div>
                ))}
            </Card>}
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