import React, { useState } from 'react'
import myDp from "../assets/shashank_dp.png"
import { BiImageAdd } from 'react-icons/bi';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { TbCalendarEvent } from "react-icons/tb"
import Card from './Card';
import ImageShareModal from './ImageShareModal';
import CreateModal from './CreateModal';

const Share = () => {
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);


    return (
        <Card className='  px-6 pt-6 pb-4 flex flex-col  text-sm'>
            <div className=' flex gap-4 w-full'>
                <img className='w-10 h-10 object-contain rounded-full bg-black' src={myDp} alt='dp' />
                <div className='w-full flex flex-col items-center justify-center'>
                    <input type='text' onClick={() => setCreateModalOpen(true)} placeholder='Whats Happening ?' className='flex items-center gap-2 px-4 py-2 rounded-xl w-full focus:outline-none bg-background-secondary dark:bg-background-seondary-dark ' />

                    <ul className='flex gap-8 pt-4 justify-center items-center'>
                        <li className='flex gap-2  items-center hover:text-accent duration-300 ' onClick={() => setImageModalOpen(true)} >
                            <BiImageAdd size={"20px"} />
                            <span>Photo</span>
                        </li>
                        <li className='flex gap-2  items-center hover:text-accent duration-300'>
                            <AiOutlineVideoCameraAdd size={"20px"} />
                            <span>video</span>
                        </li>
                        <li className='flex gap-2 items-center hover:text-accent duration-300' >
                            <MdOutlineAddLocationAlt size={"20px"} />
                            <span>Location</span>
                        </li>
                        <li className='flex gap-2 items-center hover:text-accent duration-300' >
                            <TbCalendarEvent size={"20px"} />
                            <span>Event</span>
                        </li>
                        <CreateModal createModalOpen={createModalOpen} setCreateModalOpen={setCreateModalOpen} />
                        <ImageShareModal imageModalOpen={imageModalOpen} setImageModalOpen={setImageModalOpen} />
                    </ul>

                    {/* <button className='bg-accent rounded-xl p-1 py-2 h-9 text-white font-semibold'> Share</button> */}

                </div>
            </div >
        </Card>
    )
}

export default Share