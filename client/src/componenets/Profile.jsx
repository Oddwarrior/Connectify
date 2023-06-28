import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'


import Card from './Card'
import Post from './Post';
import EditModal from './EditModal';
import default_dp from "../assets/default_dp.png"
import default_banner from "../assets/default_banner.png"
import ProfileSkeleton from './skeletons/ProfileSkeleton'
import { MdVerified } from 'react-icons/md'


import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { ENDPOINTS } from '../utils/endpoints';

const Profile = () => {
    const URL = import.meta.env.VITE_BASE_URL;
    //get user data
    const { user, dispatch } = useAuth();
    const username = (useParams().username);

    const [currentUser, setCurrentUser] = useState(null);
    const [myaccount, setMyaccount] = useState(false);
    const [profilePicture, setProfilePicture] = useState(default_dp);
    const [profileBanner, setProfileBanner] = useState(default_banner);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [following, setFollowing] = useState(true);
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();

    //fetch user
    useEffect(() => {
        fetchUser();
        setMyaccount(user.data.username === username);
        return () => {
            setLoaded(false);
        };
    }, [username]);


    useEffect(() => {
        const setFollowbutton = () => {
            let intialState = user.data.followings?.includes(currentUser?._id);
            setFollowing(intialState);
        }
        setFollowbutton();

    }, [user.data.followings, currentUser?._id, currentUser?.followers]);

    const fetchUser = async () => {
        const res = await axios.get(
            URL + ENDPOINTS.GET_USER_BY_USERNAME + username
        );
        setCurrentUser(res.data.user);
        setLoaded(true);
        console.log("profile fetched : " + currentUser?.username);
    };


    //load profile images
    useEffect(() => {
        createProfilePicture(currentUser?.profilePicture);
        createProfileBanner(currentUser?.profileBanner)
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
        currentUser?.followers?.push(user.data._id);
        // console.log(res.data);
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
        setCurrentUser({ ...currentUser, followers: currentUser.followers.filter((follower) => follower != user.data._id) })
        // console.log(res.data);
    }

    return (

        !loaded ? <ProfileSkeleton /> :
            <div className='flex flex-col gap-2 md:gap-3 md:p-3  w-full '>
                <Card className=" overflow-hidden w-full relative">
                    <div className="h-[200px] bg-background-seondary-dark ">
                        <img className=" h-full w-full object-cover border-none " src={profileBanner} />
                    </div>
                    <div>
                        <img className='  absolute m-auto  top-24  left-8 w-40 h-40 object-cover shadow-md rounded-full bg-gray-200 dark:bg-backgroundBody-dark' src={profilePicture} alt='dp' />

                    </div>

                    <div className=' grid grid-cols-2  w-full  pt-4 px-4'>
                        <div className=' flex  flex-col   gap-2 p-4'>
                            <section className=' flex flex-col  pt-8'>
                                <h1 className=' font-bold flex  items-center gap-2 dark:text-white  text-lg sm:text-xl capitalize'>{currentUser?.fname + " " + currentUser?.lname} {currentUser?.username == 'shashankjagtap' && <MdVerified color='#48cae4' />}</h1>
                                <h1 className=' dark:text-text-primary-dark ' >@{currentUser?.username}</h1>
                                <h1 className=' text-xs text-text-secondary pt-2  line-clamp-3'>{currentUser?.description} </h1>
                            </section>
                            <ul className=' flex pt-2 gap-4  justify-start text-sm'>
                                <li className=' flex gap-2 items-center justify-center  '>
                                    <h1 className='font-semibold  '>6</h1>
                                    <span> Posts</span>
                                </li>
                                <li className=' flex gap-2 items-center justify-center '>
                                    <h1 className='font-semibold  '>{currentUser?.followers?.length}</h1>
                                    <span> Followers</span>
                                </li>
                                <li className=' flex gap-2  items-center justify-center '>
                                    <h1 className='font-semibold  '>{currentUser?.followings?.length}</h1>
                                    <span> Following</span>
                                </li>
                            </ul>
                        </div>

                        <div className='flex  flex-col gap-2 justify-start p-6 items-end'>
                            {!myaccount && !following &&
                                <button className={`bg-accent  hover:bg-sky-400  duration-300 rounded-full p-1 px-3 min-w-[96px] text-sm   py-2 text-white font-semibold`}
                                    onClick={handleFollow}>{currentUser?.followings?.includes(user.data._id) ? "Follow Back" : "Follow"}
                                </button>}
                            {!myaccount && following && <button className=' border-none bg-accent bg-opacity-20 rounded-full w-24 p-1 py-2 text-accent font-semibold' onClick={handleUnfollow}>Following</button>}
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
                    {/* {posts.filter(post => post.id === 1).map(post => <Post post={post} key={post.username} />)} */}

                </section>
            </div>
    )
}

export default Profile