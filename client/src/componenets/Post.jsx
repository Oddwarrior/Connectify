import React from 'react'
import myDp from "../assets/shashank_dp.png"
import { AiOutlineHeart } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { LuShare } from "react-icons/lu"
import Card from './Card'

const Post = ({ post }) => {
    return (
        <Card className={'rounded-none md:rounded-xl'}>
            <div className='  w-full rounded-xl  p-6 flex flex-col gap-4 text-sm'>
                <div className=' flex gap-4'>
                    <img className='w-10 h-10 object-contain rounded-full bg-black' src={post.profile_image} alt='dp' />
                    <div>
                        <div className='font-semibold'>{post.username}</div>
                        <span className=' dark:text-text-secondary-dark' > {post.time}</span>
                    </div>
                </div>
                <img className='  w-full h-full bg-black rounded object-contain' src={post.image} alt='post' />
                <div className='flex flex-col gap-2'>
                    <div className='p-2'>{post.caption}</div>
                    <ul className='flex gap-4 items-center'>
                        <li className='flex gap-2'> <AiOutlineHeart size="20px" /> <span>{post.likes}</span></li>
                        <li><BiCommentDetail size={"20px"} /></li>
                        <li><LuShare size={"20px"} /></li>
                    </ul>
                </div>

            </div>
        </Card>
    )
}

export default Post