import React from 'react'
import Card from './Card';

const FollowerCard = () => {

    const followers = [
        {
            id: 1,
            image: "https://assets.vogue.in/photos/64241b21a2ad26340905ead4/1:1/w_1600%2Cc_limit/Janhvi%2520Kapoor.jpg",
            name: "John Doe",
            username: "johndoe",
        },
        {
            id: 2,
            image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSlV6_6xa2OtmeYnqL8OuszQJcpJWOFyW9tqyQ7HLRda6OG2CGNk6N1NzzbnNFfVkJJHEAFy3BMVLE0fcE",
            name: "Virat Kohli",
            username: "vk",
        },
        {
            id: 3,
            image: "https://example.com/user3.jpg",
            name: "Alex Johnson",
            username: "alexjohnson",
        },
        {
            id: 4,
            image: "https://example.com/user4.jpg",
            name: "Emily Davis",
            username: "emilydavis",
        },
        {
            id: 5,
            image: "https://example.com/user5.jpg",
            name: "Michael Brown",
            username: "michaelbrown",
        },
        // Add more follower objects as needed
    ];

    return (
        <Card className=" mt-2">
            <div className=' px-6 p-4  font-semibold'>People who follow you</div>
            <div className='overflow-auto  h-[34vh] px-4'>
                {
                    followers.map((follower) => (
                        <div key={follower.id} className=' w-full rounded-xl p-2  flex justify-between items-center gap-4 text-sm'>
                            <div className='flex gap-2'>
                                <img className='w-10 h-10 object-contain rounded-full bg-black' src={follower.image} alt='dp' />
                                <div>
                                    <div className='font-semibold'>{follower.name}</div>
                                    <span className='dark:text-text-secondary-dark'>@{follower.username}</span>
                                </div>
                            </div>
                            <button className='bg-accent rounded-xl px-4 p-2 text-white font-semibold'>Follow</button>
                        </div>
                    ))
                }
            </div>


        </Card>
    )
}

export default FollowerCard