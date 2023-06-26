import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import { MdVerified } from 'react-icons/md'
import { ENDPOINTS } from '../utils/endpoints';

import Card from './Card';
import axios from 'axios'
import SuggestionsSkeleton from './skeletons/SuggestionsSkeleton';
import default_dp from "../assets/default_dp.png"
import NoSuggestions from "../assets/NoSuggestions.png"

const FollowerCard = () => {
    const URL = import.meta.env.VITE_BASE_URL;
    const { user, dispatch } = useAuth();

    const [sugesstions, setSugesstions] = useState(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        fetchSggestions();
        return () => {
            setLoaded(false);
        }
    }, [user.data.followings]);

    const fetchSggestions = async () => {
        const { data } = await axios.get(URL + ENDPOINTS.GET_SUGGESTIONS + user.data._id);
        // console.log(data);
        console.log("Suggestions fetched : ");
        setSugesstions(data?.users);
        setLoaded(true);
    }

    const handleFollow = async (userToFollow) => {
        const res = await axios.put(
            URL + "/api/user/" + userToFollow + "/follow",
            {},
            {
                headers: { Authorization: "Bearer " + user.accessToken },
            }
        );
        dispatch({ type: "FOLLOW", payload: user.data._id })
        user.followers.push(user.data._id);
    }

    // const followers = [
    //     {
    //         id: 1,
    //         image: "https://assets.vogue.in/photos/64241b21a2ad26340905ead4/1:1/w_1600%2Cc_limit/Janhvi%2520Kapoor.jpg",
    //         name: "John Doe",
    //         username: "johndoe",
    //     },
    //     {
    //         id: 2,
    //         image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSlV6_6xa2OtmeYnqL8OuszQJcpJWOFyW9tqyQ7HLRda6OG2CGNk6N1NzzbnNFfVkJJHEAFy3BMVLE0fcE",
    //         name: "Virat Kohli",
    //         username: "vk",
    //     },
    //     {
    //         id: 3,
    //         image: "http://localhost:3000/default_dp.png",
    //         name: "Alex Johnson",
    //         username: "alexjohnson",
    //     },
    //     {
    //         id: 4,
    //         image: "https://example.com/user4.jpg",
    //         name: "Emily Davis",
    //         username: "emilydavis",
    //     },
    //     {
    //         id: 5,
    //         image: "https://example.com/user5.jpg",
    //         name: "Michael Brown",
    //         username: "michaelbrown",
    //     },
    //     // Add more follower objects as needed
    // ];

    return (
        <Card className="mt-3">
            <div className=' px-6 p-4  font-semibold'>Suggested Connections</div>

            <div className=' max-h-[40vh] px-6'>
                {
                    !loaded ? <SuggestionsSkeleton /> :
                        sugesstions.slice(0, 4)?.map((user) => (
                            <div key={user?._id} className=' w-full rounded-xl p-2   flex justify-between items-center gap-4 text-sm'>
                                <Link to={`/user/${user?.username}`} className='flex gap-2'>
                                    <img className='w-10 h-10 object-cover rounded-full bg-background-dark' src={loaded ? URL + "/" + user?.profilePicture : default_dp} alt='dp' />
                                    <div>
                                        <div className='font-semibold flex  capitalize items-center gap-2'>
                                            <h1>{user?.fname + " " + user?.lname}</h1>
                                            <h1>{user?.username == 'shashankjagtap' && <MdVerified color='#48cae4' />}</h1></div>
                                        <span className=' text-text-secondary-dark text-sm'>@{user?.username}</span>
                                    </div>
                                </Link>
                                <button onClick={() => handleFollow(user?.username)} className='bg-accent rounded-xl px-4 p-1 text-white font-semibold active:bg-black'>Follow</button>
                            </div>
                        ))
                }
                {sugesstions?.length != 0 && <button className='  w-full text-center font-semibold pt-2  pb-4 text-accent '>View More</button>}

                {
                    loaded && sugesstions?.length == 0 &&
                    <div className='  flex flex-col gap-2  justify-center items-center pb-4'>
                        <img className=' w-40 h-40 object-contain' src={NoSuggestions} />
                        <h1 className=' text-center  text-sm  text-text-secondary'>Already Following Everyone !!</h1>
                    </div>
                }
            </div>


        </Card>
    )
}

export default FollowerCard