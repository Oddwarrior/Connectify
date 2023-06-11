import React from 'react'
import { HiOutlineHome } from "react-icons/hi"
import { MdOutlineNotificationsNone, MdContentCopy } from "react-icons/md"
import { RiAccountCircleLine } from "react-icons/ri"
import { BiBookmark } from "react-icons/bi"
import { FiSettings } from "react-icons/fi"
import myDp from "../assets/shashank_dp.png"
import logo from "../assets/logo.png"

const LeftBar = () => {
    return (
        <div className=' flex flex-col items-center px-6 gap-8 pt-8 border h-screen '>
            <img className=' font-extrabold  text-lg p-2 w-40 h-20 object-contain' src={logo} />
            <div className=''>
                <ul className='flex flex-col gap-6 font-bold duration-300  text-text-primary '>
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
            </div>
            <MiniProfile />

        </div>
    )
}


const MiniProfile = () => {
    return (
        <div className=' bg-background  w-[250px] rounded-xl  p-6  text-text-primary flex flex-col gap-4 text-sm'>
            <div className=' flex gap-2'>
                <img className='w-10 h-10 object-contain rounded-full bg-black' src={myDp} alt='dp' />
                <div>
                    <div className='font-semibold'>Shashank Jagtap</div>
                    <span >@shashak.jagtap</span>
                </div>
            </div>
            <button className='  border  border-accent  text-accent rounded-xl p-1 py-2 font-semibold'>
                <div className=' flex gap-2 justify-center items-center'>
                    Share
                    <MdContentCopy size={"16px"} />
                </div>

            </button>
            <button className='bg-accent rounded-xl p-1 py-2 text-white font-semibold'> logout</button>
        </div>
    )
}

export default LeftBar