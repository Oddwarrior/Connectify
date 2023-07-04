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
import Refresh from '../utils/Refresh';

const SuggestionCard = () => {
    const URL = import.meta.env.VITE_BASE_URL;
    const { user, dispatch } = useAuth();

    const [sugesstions, setSugesstions] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const axiosJWT = axios.create();
    Refresh(axiosJWT);


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
        setSugesstions(data?.users?.slice(0, 4));
        setLoaded(true);
    }

    const handleFollow = async (userToFollow) => {
        const res = await axiosJWT.put(
            URL + "/api/user/" + userToFollow + "/follow",
            {},
            {
                headers: { Authorization: "Bearer " + user.accessToken },
            }
        );
        dispatch({ type: "FOLLOW", payload: user.data._id })
        user.followers.push(user.data._id);
    }


    return (
        <Card className="mt-3">
            <div className=' px-6 p-4  font-semibold'>Suggested Connections</div>

            <div className=' max-h-[40vh] px-6 overflow-hidden'>
                {
                    !loaded ? <SuggestionsSkeleton /> :
                        sugesstions?.map((user) => (
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
                                <button onClick={() => handleFollow(user?.username)} className='bg-accent hover:bg-sky-400  duration-300  rounded-xl px-4 p-1 text-white font-semibold active:bg-black'>Follow</button>
                            </div>
                        ))
                }
                {sugesstions?.length != 0 && <button className='  w-full text-center font-semibold pt-3  pb-4 text-accent '>View More</button>}

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

export default SuggestionCard