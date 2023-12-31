import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { HiOutlineHome } from "react-icons/hi"
import { MdOutlineNotificationsNone, MdContentCopy } from "react-icons/md"
import { RiAccountCircleLine } from "react-icons/ri"
import { BiBookmark } from "react-icons/bi"
import { FiSettings } from "react-icons/fi"
import { CiLight } from "react-icons/ci"
import { MdOutlineDarkMode } from "react-icons/md"

import { useAuth } from '../contexts/AuthContext'
import default_dp from "../assets/default_dp.png"
import logo from "../assets/logo_icon.png"
import Card from './Card'
import { toast } from 'react-hot-toast'

const LeftBar = () => {
    const { user, theme, dispatch } = useAuth();

    const navigate = useNavigate();

    //
    return (
        <div className=' hidden lg:flex flex-col lg:w-full  bg-background  dark:bg-backgroundBody-dark items-center px-8 gap-8 pt-8  h-screen justify-start '>

            <Link to="/" className='flex  pl-6 gap-2  items-center w-full mt-6 '>
                <img className=' font-extrabold text-lg w-8 h-8   object-contain' src={logo} />
                <span className=' font-bold text-xl'>Connectify</span>
            </Link>
            <ul className='flex flex-col  gap-6 font-semibold duration-300  w-full pl-6  mt-4 '>
                <Link to="/" className=' focus:text-accent'  >
                    <div className=' flex gap-4  items-center   hover:text-b hover:transition-colors '>
                        <HiOutlineHome size={"20px"} />
                        Home
                    </div>
                </Link>
                <Link to={`/user/${user.data.username}`} className=' focus:text-accent'>
                    <div className=' flex gap-4  items-center   hover:text-sky-400 duration-300  '>
                        <RiAccountCircleLine size={"20px"} />
                        Profile
                    </div>
                </Link>
                <Link className=' focus:text-accent'>
                    <div className=' flex gap-4  items-center   hover:text-sky-400 duration-300  '>
                        <MdOutlineNotificationsNone size={"20px"} />
                        Notification
                    </div>
                </Link>
                <Link className=' focus:text-accent'>
                    <div className=' flex gap-4  items-center   hover:text-sky-400 duration-300  '>
                        <BiBookmark size={"20px"} />
                        Saved
                    </div>
                </Link>
                <Link className=' focus:text-accent'>
                    <div className=' flex gap-4  items-center   hover:text-sky-400 duration-300  '>
                        <FiSettings size={"20px"} />
                        Setting
                    </div>
                </Link>
            </ul>

            <MiniProfile />
        </div>
    )
}

const MiniProfile = () => {
    const navigate = useNavigate();
    const { user, dispatch, theme } = useAuth();

    const { fname, lname, username, profilePicture } = user.data;



    useEffect(() => {
        if (theme == "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");

    }, [theme]);

    const handleTheme = () => {
        if (theme == "light") dispatch({ type: "CHANGE_THEME", payload: "dark" });
        else dispatch({ type: "CHANGE_THEME", payload: "light" });
    }

    const handleLogout = () => {
        navigate(0);
        dispatch({ type: "LOGOUT" });
    }
    const handleCopy = () => {
        const link = import.meta.env.VITE_CLIENT_URL + "user/" + user.data.username;
        navigator.clipboard.writeText(link)
        toast.success("copied to clipboard")
    }

    return (
        <Card className='flex flex-col gap-3 p-4  bg-backgroundBody'>
            <Link to={`/user/${user.data.username}`} className=' flex gap-2 w-[90%] text-xs  items-center '>

                <img className='w-10 h-10 object-cover  rounded-full bg-black' src={profilePicture} alt='' />

                <div>
                    <div className='font-semibold  line-clamp-1 capitalize'>{fname + " " + lname}</div>
                    <span className=' dark:text-text-secondary  text-text-secondary' >@{username}</span>
                </div>
            </Link>
            <button onClick={handleCopy} className='  border-none   hover:bg-opacity-25 duration-300 text-accent bg-accent bg-opacity-10 rounded-full p-1 py-2 font-semibold'>
                <div className=' flex gap-2 justify-center items-center'>
                    Share
                    <MdContentCopy size={"16px"} />
                </div>
            </button>
            <button className='bg-accent hover:bg-sky-400 duration-300 rounded-full p-1 py-2 text-white font-semibold'
                onClick={handleLogout}>
                logout
            </button>
            <button
                className=' p-1 py-2 rounded-full bg-background-dark  text-white dark:bg-backgroundBody dark:text-backgroundBody-dark'
                onClick={handleTheme} > {theme == 'dark' ?
                    <div className=' flex gap-2 justify-center items-center font-semibold'>
                        <span> <CiLight size={"20px"} /> </span>
                        <span>Light</span>
                    </div>
                    :
                    <div className=' flex gap-2 justify-center items-center font-semibold'>
                        <span> <MdOutlineDarkMode size={"20px"} /> </span>
                        <span>Dark</span>
                    </div>}
            </button>


        </Card>
    )
}

export default LeftBar