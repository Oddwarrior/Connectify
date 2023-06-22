import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';

import Card from './Card'
import Post from './Post';
import EditModal from './EditModal';
import default_dp from "../assets/default_dp.png"
import default_banner from "../assets/default_banner.png"
import { posts } from './Feed';

import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { ENDPOINTS } from '../utils/endpoints';

const Profile = () => {
    const URL = import.meta.env.VITE_BASE_URL;
    //get user data
    const { user, dispatch } = useAuth();
    const username = (useParams().username);

    const [currentUser, setCurrentUser] = useState(user);
    const [myaccount, setMyaccount] = useState(false);
    const [profilePicture, setProfilePicture] = useState(default_dp);
    const [profileBanner, setProfileBanner] = useState(default_banner);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [following, setFollowing] = useState(true);
    const [loaded, setLoaded] = useState(false);


    //fetch user
    useEffect(() => {

        fetchUser();
        setMyaccount(user.data.username === username);
    }, [username, user.data.followings],);

    useEffect(() => {
        const setFollowbutton = () => {
            let intialState = user.data.followings?.includes(currentUser._id);
            setFollowing(intialState);
        }
        setFollowbutton();

    }, [user.data.followings, currentUser._id]);

    const fetchUser = async () => {
        // setLoaded(false);
        const res = await axios.get(
            URL + ENDPOINTS.GET_USER_BY_USERNAME + username
        );
        setCurrentUser(res.data.user);
        // setLoaded(true);
        console.log(res.data);
    };


    //load profile images
    useEffect(() => {
        createProfilePicture(currentUser.profilePicture);
        createProfileBanner(currentUser.profileBanner)
    }, [currentUser]);

    const createProfilePicture = async (imageName) => {
        let imgurl = URL + '/' + imageName;
        const response = await fetch(imgurl);
        setProfilePicture(response.url);
    }
    const createProfileBanner = async (imageName) => {
        let imgurl = URL + '/' + imageName;
        const response = await fetch(imgurl);
        setProfileBanner(response.url);
    }

    //folllow unfollow

    const handleFollow = async () => {
        setFollowing(true);
        const res = await axios.put(
            URL + "/api/user/" + username + "/follow",
            {},
            {
                headers: { Authorization: "Bearer " + user.accessToken },
            }
        );
        dispatch({ type: "FOLLOW", payload: currentUser._id })
        console.log(res.data);
    }
    const handleUnfollow = async () => {
        setFollowing(false);
        const res = await axios.put(
            URL + "/api/user/" + username + "/unfollow",
            {},
            {
                headers: { Authorization: "Bearer " + user.accessToken },
            }
        );
        dispatch({ type: "UNFOLLOW", payload: currentUser._id })
        console.log(res.data);
    }

    return (

        <div className='flex flex-col gap-2 md:gap-3 md:p-3  w-full '>
            <Card className=" overflow-hidden w-full relative">
                <div className="h-[200px]">
                    <img className=" h-full w-full object-cover" src={profileBanner} />
                    {/* <img className=" h-full w-full object-cover" src="https://media.istockphoto.com/id/1225173869/photo/house-boat-anchored-in-lake-with-jungle-background-backwaters-kerala-india.jpg?s=612x612&w=0&k=20&c=uo-bsRQjhlT9AgeWBs_pkSvHQwStCelMC75EUpzwjHU=" /> */}
                </div>
                <img className=' absolute m-auto  top-24  left-8 w-40 h-40 object-cover shadow-md rounded-full bg-black' src={profilePicture} alt='dp' />

                <div className=' grid grid-cols-2  w-full  pt-4 px-4'>
                    <div className=' flex  flex-col   gap-2 p-4'>
                        <section className=' flex flex-col  pt-8'>
                            <h1 className=' font-bold  dark:text-white text-xl'>{currentUser?.fname + " " + currentUser?.lname}</h1>
                            <h1 className=' dark:text-text-primary-dark ' >{currentUser?.username}</h1>
                            <h1 className=' text-xs text-text-secondary pt-2  line-clamp-3'>{currentUser?.description} </h1>
                        </section>
                        <ul className=' flex pt-2 gap-4  justify-start text-sm'>
                            <li className=' flex gap-2 items-center justify-center  '>
                                <h1 className='font-semibold  '>6</h1>
                                <span> Posts</span>
                            </li>
                            <li className=' flex gap-2 items-center justify-center '>
                                <h1 className='font-semibold  '>{currentUser.followers?.length}</h1>
                                <span> Followers</span>
                            </li>
                            <li className=' flex gap-2  items-center justify-center '>
                                <h1 className='font-semibold  '>{currentUser.followings?.length}</h1>
                                <span> Following</span>
                            </li>
                        </ul>
                    </div>

                    <div className='flex  flex-col gap-2 justify-start p-6 items-end'>
                        {!myaccount && !following && <button className='bg-accent rounded-full w-24 p-1 py-2 text-white font-semibold' onClick={handleFollow}>Follow</button>}
                        {!myaccount && following && <button className='border border-accent rounded-full w-24 p-1 py-2 text-accent font-semibold' onClick={handleUnfollow}>Following</button>}
                        {myaccount && <button
                            className='rounded-full w-28 py-2  bg-black dark:bg-white  text-white dark:text-black font-semibold'
                            onClick={() => setEditModalOpen(true)}
                        >Edit profile
                        </button>
                        }
                    </div>
                    <EditModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} profileBanner={profileBanner} profilePhoto={profilePicture} />
                </div>
            </Card>
            <section className='flex flex-col gap-3'>
                {posts.filter(post => post.id === 1).map(post => <Post post={post} key={post.username} />)}

            </section>
        </div>
    )
}

export default Profile