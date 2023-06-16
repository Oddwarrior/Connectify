import React, { useState } from 'react'
import { HiOutlineHome } from "react-icons/hi"
import { MdOutlineNotificationsNone, MdContentCopy } from "react-icons/md"
import { RiAccountCircleLine } from "react-icons/ri"
import { BiBookmark } from "react-icons/bi"
import { FiSettings } from "react-icons/fi"
import myDp from "../assets/shashank_dp.png"
import logo from "../assets/logo.png"
import Card from './Card'

const LeftBar = () => {
    const [theme, setTheme] = useState(false);
    if (theme) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    const handleTheme = () => {
        setTheme(!theme);
    }
    //
    return (
        <div className=' flex flex-col  bg-background  dark:bg-backgroundBody-dark items-center px-8 gap-8 pt-8 w-full h-screen justify-start '>
            <img className=' font-extrabold  text-lg  w-full object-contain' src={logo} />

            <ul className='flex flex-col gap-6 font-semibold duration-300  w-full  '>
                <li>
                    <div className=' flex gap-4  items-center  hover:text-accent hover:transition-colors '>
                        <HiOutlineHome size={"20px"} />
                        Home
                    </div>
                </li>
                <li>
                    <div className=' flex gap-4  items-center  hover:text-accent hover:transition-colors '>
                        <MdOutlineNotificationsNone size={"20px"} />
                        Notification
                    </div>
                </li>
                <li>
                    <div className=' flex gap-4  items-center  hover:text-accent hover:transition-colors '>
                        <RiAccountCircleLine size={"20px"} />
                        Account
                    </div>
                </li>
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
    return (
        <Card className='flex flex-col gap-4 p-4 text-sm bg-backgroundBody'>
            <div className=' flex gap-2 w-[90%] text-xs  items-center'>
                <img className='w-10 h-10 object-contain rounded-full bg-black' src={myDp} alt='dp' />
                <div>
                    <div className='font-semibold '>Shashank Jagtap</div>
                    <span className=' dark:text-text-secondary-dark' >@shashak.jagtap</span>
                </div>
            </div>
            <button className='  border  border-accent  text-accent rounded-xl p-1 py-2 font-semibold'>
                <div className=' flex gap-2 justify-center items-center'>
                    Share
                    <MdContentCopy size={"16px"} />
                </div>

            </button>
            <button className='bg-accent rounded-xl p-1 py-2 text-white font-semibold'> logout</button>

        </Card>
    )
}

export default LeftBar