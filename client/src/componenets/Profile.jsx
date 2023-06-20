import React from 'react'
import Card from './Card'
import { useState } from 'react';
import Post from './Post';

import { posts } from './Feed';
import EditModal from './EditModal';

const Profile = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [following, setFollowing] = useState(false);
    const handleFollow = () => {
        // do api calling
        setFollowing(true);
    }
    const handleUnfollow = () => {
        // do api calling
        setFollowing(false);
    }

    let me = true;
    return (
        <div className='flex flex-col gap-2 md:gap-3 md:p-3  w-full '>
            <Card className=" overflow-hidden w-full relative">
                <div className="h-[200px]">
                    <img className=" h-full w-full object-cover" src="https://media.istockphoto.com/id/1225173869/photo/house-boat-anchored-in-lake-with-jungle-background-backwaters-kerala-india.jpg?s=612x612&w=0&k=20&c=uo-bsRQjhlT9AgeWBs_pkSvHQwStCelMC75EUpzwjHU=" />
                </div>
                <img className=' absolute m-auto  top-24  left-8 w-40 h-40 object-cover shadow-md rounded-full bg-black' src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt='dp' />

                <div className=' grid grid-cols-2  w-full  pt-4 px-4'>
                    <div className=' flex  flex-col   gap-2 p-4'>
                        <section className=' flex flex-col  pt-8'>
                            <h1 className=' font-bold  dark:text-white text-xl'>Shashank Jagtap</h1>
                            <h1 className=' dark:text-text-primary-dark ' >@shashak.jagtap</h1>
                            <h1 className=' text-xs text-text-secondary pt-2  line-clamp-3'>BTech EXTC | Sardar Patel Institute of Technology, Andheri , Mumba BTech EXTC </h1>
                        </section>
                        <ul className=' flex pt-2 gap-4  justify-start text-sm'>
                            <li className=' flex gap-2 items-center justify-center  '>
                                <h1 className='font-semibold  '>6</h1>
                                <span> Posts</span>
                            </li>
                            <li className=' flex gap-2 items-center justify-center '>
                                <h1 className='font-semibold  '>600</h1>
                                <span> Followers</span>
                            </li>
                            <li className=' flex gap-2  items-center justify-center '>
                                <h1 className='font-semibold  '>403</h1>
                                <span> Following</span>
                            </li>
                        </ul>
                    </div>

                    <div className='flex  flex-col gap-2 justify-start p-6 items-end'>
                        {!me && !following && <button className='bg-accent rounded-full w-24 p-1 py-2 text-white font-semibold' onClick={handleFollow}>Follow</button>}
                        {!me && following && <button className='border border-accent rounded-full w-24 p-1 py-2 text-accent font-semibold' onClick={handleUnfollow}>Following</button>}
                        {me && <button
                            className='rounded-full w-28 py-2  bg-black dark:bg-white  text-white dark:text-black font-semibold'
                            onClick={() => setEditModalOpen(true)}
                        >Edit profile
                        </button>
                        }
                    </div>
                    <EditModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} />
                </div>
            </Card>
            <section className='flex flex-col gap-3'>
                {posts.filter(post => post.id === 1).map(post => <Post post={post} key={post.username} />)}
            </section>
        </div>
    )
}

export default Profile