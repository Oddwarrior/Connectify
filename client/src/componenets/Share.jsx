import React from 'react'
import myDp from "../assets/shashank_dp.png"
import { BiImageAdd } from 'react-icons/bi';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { MdOutlineAddLocationAlt } from 'react-icons/md';

const Share = () => {
    return (
        <div className=' bg-background w-full rounded-xl px-6 pt-6 pb-4  text-text-primary flex flex-col gap-4 text-sm'>
            <div className=' flex gap-4 w-full'>
                <img className='w-10 h-10 object-contain rounded-full bg-black' src={myDp} alt='dp' />
                <div className='w-full flex flex-col items-center'>
                    <div className=' flex sm:grid grid-cols-[auto_20%] w-full gap-4'>
                        <div className='w-full'>
                            <input type='text' placeholder='Whats Happening ?' className='flex items-center gap-2 px-4 py-2 rounded-xl w-full focus:outline-none  bg-background-dark text-text-primary' />
                            <ul className='flex gap-8 pt-4 justify-center items-center'>
                                <li className='flex gap-2'>
                                    <BiImageAdd size={"20px"} />
                                    <span>Photo</span>
                                </li>
                                <li className='flex gap-2'>
                                    <AiOutlineVideoCameraAdd size={"20px"} />
                                    <span>video</span>
                                </li>
                                <li className='flex gap-2'>
                                    <MdOutlineAddLocationAlt size={"20px"} />
                                    <span>Location</span>
                                </li>

                            </ul>

                        </div>
                        <button className='bg-accent rounded-xl p-1 py-2 h-9 text-white font-semibold'> Post</button>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default Share