import React from 'react'
import Share from './Share'
import Post from './Post'

const posts = [
    {
        id: 1,
        image: "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
        time: "June 1, 2023 12:00 PM",
        caption: "Beautiful sunset at the beach! #sunset #beachvibes",
        username: "jelly.fish",
        comments: 10,
        likes: 25,
        profile_image: "https://media.phillyvoice.com/media/images/120522_Lensa_AI.width-696.jpg",
    },
    {
        id: 2,
        image: "https://www.freecodecamp.org/news/content/images/2022/04/derick-mckinney-oARTWhz1ACc-unsplash.jpg",
        time: "May 30, 2023 10:30 AM",
        caption: "Exploring the mountains on a sunny day. #adventure #mountainlife",
        username: "jane_smith",
        comments: 5,
        likes: 15,
        profile_image: "https://tostatus.in/wp-content/uploads/2023/02/Single-Boy-DP-2023-1024x1024.jpg",
    },
    {
        id: 3,
        image: "https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_640.jpg",
        time: "May 28, 2023 6:45 PM",
        caption: "Delicious homemade pizza for dinner! 🍕😋 #foodlover #homemade",
        username: "alex_johnson",
        comments: 8,
        likes: 20,
        profile_image: "https://www.dpforwhatsapp.in/img/beautiful-dp-for-whatsapp/12.webp",
    },
    // Add more post objects as needed
];


const Middle = () => {
    return (
        <div className='flex flex-col gap-4 pt-6 px-6 v overflow-auto h-screen'>
            <Share />
            {posts.map(post => <Post post={post} key={post.id} />)}
        </div>
    )
}

export default Middle