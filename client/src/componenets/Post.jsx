import React, { useState } from 'react'
import myDp from "../assets/shashank_dp.png"
import { AiOutlineHeart } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { LuShare } from "react-icons/lu"
import Card from './Card'
import moment from 'moment';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ENDPOINTS } from '../utils/endpoints';
import { useAuth } from '../contexts/AuthContext';
import Refresh from '../utils/Refresh';

const Post = ({ post }) => {

    const { user: currentUser } = useAuth();
    const axiosJWT = axios.create();
    Refresh(axiosJWT);


    let { _id, user, description, image, createdAt, likes, comment } = post;
    const [Likes, setLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(Likes?.includes(currentUser.data._id) || false);

    const handleLikeUnlike = async () => {
        // dislike
        if (isLiked) {
            setIsLiked(false);
            console.log(currentUser.data._id);
            setLikes(prevLikes => prevLikes.filter(id => id !== currentUser.data._id));
        }
        //like
        else {
            setLikes([...Likes, currentUser.data._id])
            setIsLiked(true);
        }

        const URL = `${import.meta.env.VITE_BASE_URL}${ENDPOINTS.POST}${_id}/like`;
        try {
            const res = await axiosJWT.get(URL,
                {
                    headers: { Authorization: "Bearer " + currentUser.accessToken },
                }
            );
            // console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    }


    const imgurl = import.meta.env.VITE_BASE_URL;
    return (
        <Card className={'rounded-none md:rounded-xl'}>
            <div className='  w-full rounded-xl  p-6 flex flex-col gap-4 text-sm '>
                <Link to={`/user/${user.username}`} className=' flex gap-4 items-center'>
                    <img className='w-10 h-10 object-cover rounded-full bg-black' src={imgurl + "/" + user.profilePicture} alt='dp' />
                    <div>
                        <div className='font-semibold'>{user.username}</div>
                        <span className=' dark:text-text-secondary-dark text-xs' > {moment(createdAt).fromNow()}</span>
                    </div>
                </Link>
                {image && <img className='  w-full h-full bg-black rounded object-contain' src={imgurl + "/" + image} alt='post' />}

                <div className='flex flex-col gap-2'>
                    {description && <div className=' dark:text-text-secondary-dark pb-2  max-h-24 line-clamp-5  overflow-hidden'>{description}</div>}

                    <ul className='flex gap-4 items-center '>
                        <li className='flex gap-2 w-10 '>
                            <span className='active:animate-ping duration-150 ' onClick={handleLikeUnlike}>
                                {isLiked ? <FcLike size="20px" /> :
                                    <AiOutlineHeart size="20px" />}
                            </span>
                            <span>{Likes?.length}</span>
                        </li>

                        <li className='flex gap-2'>
                            <BiCommentDetail size={"20px"} />
                            <span>{comment?.length}</span>
                        </li>
                        <li><LuShare size={"20px"} /></li>
                    </ul>
                </div>

            </div>
        </Card>
    )
}

export default Post