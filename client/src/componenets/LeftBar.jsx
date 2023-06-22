import React, { useEffect, useState } from 'react'
import { HiOutlineHome } from "react-icons/hi"
import { MdOutlineNotificationsNone, MdContentCopy } from "react-icons/md"
import { RiAccountCircleLine } from "react-icons/ri"
import { BiBookmark } from "react-icons/bi"
import { FiSettings } from "react-icons/fi"
import default_dp from "../assets/default_dp.png"
import logo from "../assets/logo.png"
import Card from './Card'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const LeftBar = () => {
    const { user, theme, dispatch } = useAuth();

    useEffect(() => {
        if (theme == "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");

    }, [theme]);


    const navigate = useNavigate();
    const handleTheme = () => {
        if (theme == "light") dispatch({ type: "CHANGE_THEME", payload: "dark" });
        else dispatch({ type: "CHANGE_THEME", payload: "light" });
    }
    //
    return (
        <div className=' flex flex-col  bg-background  dark:bg-backgroundBody-dark items-center px-8 gap-8 pt-8 w-full h-screen justify-start '>
            <img className=' font-extrabold p-4 text-lg  w-full object-contain' src={logo} />

            <ul className='flex flex-col  gap-6 font-semibold duration-300  w-full pl-6  '>
                <Link to="/"  >
                    <div className=' flex gap-4  items-center   hover:text-accent hover:transition-colors '>
                        <HiOutlineHome size={"20px"} />
                        Home
                    </div>
                </Link>
                <Link to={`/user/${user.data.username}`}>
                    <div className=' flex gap-4  items-center  hover:text-accent hover:transition-colors '>
                        <RiAccountCircleLine size={"20px"} />
                        Profile
                    </div>
                </Link>
                <Link to='/user/shubh'>
                    <div className=' flex gap-4  items-center  hover:text-accent hover:transition-colors '>
                        <MdOutlineNotificationsNone size={"20px"} />
                        Notification
                    </div>
                </Link>
                <li>
                    <div className=' flex gap-4  items-center  hover:text-accent hover:transition-colors '>
                        <BiBookmark size={"20px"} />
                        Saved
                    </div>
                </li>
                <li>
                    <div className=' flex gap-4  items-center  hover:text-accent hover:transition-colors '>
                        <FiSettings size={"20px"} />
                        Setting
                    </div>
                </li>
            </ul>

            <MiniProfile />
            <button onClick={handleTheme} > {theme ? 'Light' : 'Dark'}</button>
        </div>
    )
}

const MiniProfile = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useAuth();

    const [img, setImg] = useState(default_dp);
    const { fname, lname, username, profilePicture } = user.data;
    const imgurl = import.meta.env.VITE_BASE_URL + "/" + profilePicture;

    useEffect(() => {
        createImage();
    }, [user]);

    const createImage = async () => {
        const response = await fetch(imgurl);
        setImg(response.url);
    }

    const handleLogout = () => {
        navigate(0);
        dispatch({ type: "LOGOUT" });
    }

    return (
        <Card className='flex flex-col gap-4 p-4 text-sm bg-backgroundBody'>
            <Link to={`/user/${user.data.username}`} className=' flex gap-2 w-[90%] text-xs  items-center'>

                <img className='w-10 h-10 object-cover  rounded-full bg-black' src={img} alt='' />

                <div>
                    <div className='font-semibold  line-clamp-1 capitalize'>{fname + " " + lname}</div>
                    <span className=' dark:text-text-secondary-dark' >@{username}</span>
                </div>
            </Link>
            <button className='  border  border-accent  text-accent rounded-full p-1 py-2 font-semibold'>
                <div className=' flex gap-2 justify-center items-center'>
                    Share
                    <MdContentCopy size={"16px"} />
                </div>
            </button>
            <button className='bg-accent rounded-full p-1 py-2 text-white font-semibold' onClick={handleLogout}> logout</button>

        </Card>
    )
}

export default LeftBar