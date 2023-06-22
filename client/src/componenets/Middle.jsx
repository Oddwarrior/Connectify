import React from 'react'
import Feed from './Feed'
import Profile from './Profile'
import { Outlet, useParams } from 'react-router-dom'


const Middle = () => {
    const username = useParams().username;
    return (
        <div className='  overflow-auto  w-full min-w-[400px] h-screen border dark:border-gray-700 '>
            <section className='w-full p-4 z-10  sticky top-0  font-bold bg-opacity-90 dark:bg-opacity-95 bg-background dark:bg-backgroundBody-dark border-b dark:border-background-dark'>{username ? username : "Home"}</section>
            <Outlet />
        </div>
    )
}

export default Middle