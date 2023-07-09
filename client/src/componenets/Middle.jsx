import React from 'react'
import Feed from './Feed'
import Profile from './Profile'
import { Outlet, useNavigate, useParams } from 'react-router-dom'


const Middle = () => {
    const username = useParams().username;
    const postId = useParams().postId;
    const navigate = useNavigate();
    return (
        <div className='  overflow-auto  w-full h-screen border dark:border-gray-700 '>
            <section className='w-full p-4 z-10  sticky top-0  font-bold bg-opacity-90 dark:bg-opacity-95 bg-background dark:bg-backgroundBody-dark border-b dark:border-background-dark'>
                {username &&
                    <span onClick={() => navigate(-1)}>{username}</span>
                }

                {postId &&
                    <span onClick={() => navigate(-1)}>{"Post"}</span>
                }
                <span >{!username && !postId && "Home"} </span>
            </section>
            <Outlet />
        </div>
    )
}

export default Middle