import React from 'react'
import Share from './Share'
import Post from './Post'


export const posts = [
    {
        id: 7,
        image: "https://wallpaperaccess.com/thumb/9070071.png",
        time: "June 1, 2023 11:45 AM",
        caption: "Vibrant colors and abstract art. #artisticexpression #abstract",
        username: "olivia_smith",
        comments: 6,
        likes: 22,
        profile_image: "https://example.com/profile7.jpg",
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
        id: 2,
        image: "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
        time: "June 1, 2023 12:00 PM",
        caption: "Beautiful sunset at the beach! #sunset #beachvibes",
        username: "jelly.fish",
        comments: 10,
        likes: 25,
        profile_image: "https://media.phillyvoice.com/media/images/120522_Lensa_AI.width-696.jpg",
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
    {
        id: 1,
        image: "https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg",
        time: "June 5, 2023 9:00 AM",
        caption: "Minimalistic design at its best. #minimalism #design",
        username: "michael_jackson",
        comments: 12,
        likes: 32,
        profile_image: "https://example.com/profile4.jpg",
    },
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        time: "June 3, 2023 4:30 PM",
        caption: "Capturing the beauty of nature. #naturephotography #landscape",
        username: "emily_williams",
        comments: 8,
        likes: 27,
        profile_image: "https://example.com/profile5.jpg",
    },
    {
        id: 1,
        image: "https://wallpapers.com/images/featured/2ygv7ssy2k0lxlzu.jpg",
        time: "June 2, 2023 7:15 AM",
        caption: "Dreaming of travel and adventure. ✈️🌍 #wanderlust #explore",
        username: "david_andrews",
        comments: 5,
        likes: 18,
        profile_image: "https://example.com/profile6.jpg",
    },

    {
        id: 8,
        image: "https://d1hjkbq40fs2x4.cloudfront.net/2019-10-29/files/canon-portrait-photography-techniques_1934-1_c.jpg",
        time: "May 30, 2023 3:20 PM",
        caption: "Exploring the art of portrait photography. #portraitphotography #photography",
        username: "william_jones",
        comments: 10,
        likes: 30,
        profile_image: "https://example.com/profile8.jpg",
    },
    // Add more post objects as needed
];


const Feed = () => {
    return (
        <section className='flex flex-col gap-2 md:gap-3 md:p-3  '>
            <Share />
            {posts.map(post => <Post post={post} key={post.id} />)}
        </section>
    )
}

export default Feed