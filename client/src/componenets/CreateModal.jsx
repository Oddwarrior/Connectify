import { useState, useRef } from "react";
import { Modal, Button, Group } from "@mantine/core";
import { TiLocation } from "react-icons/ti"
import { BsFillImageFill, BsFillCameraVideoFill } from 'react-icons/bs';
import { BsCalendar2EventFill } from "react-icons/bs"
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { ENDPOINTS } from "../utils/endpoints";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


export default function CreateModal({ createModalOpen, setCreateModalOpen, img: profilePicture }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const initial = {
        image: "",
        caption: "",
        url: "",
    }

    const [postData, setPostData] = useState(initial);
    const fileRef = useRef();

    const onImageChange = (e) => {
        const img = e.target.files?.[0];
        if (img) setPostData({ ...postData, image: img, url: URL.createObjectURL(img) });
    }
    const handleClose = () => {
        setCreateModalOpen(false);
        setPostData(initial);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = import.meta.env.VITE_BASE_URL + ENDPOINTS.POST;
        const { image, caption } = postData;

        if (image || caption) {

            try {
                const postFormdata = new FormData();
                postFormdata.append("image", image);
                postFormdata.append("description", caption);

                const res = await axios.post(url,
                    postFormdata,
                    {
                        headers: { Authorization: "Bearer " + user.accessToken },
                    }
                );

                // console.log(res.data);
                toast.success("Post created")

            } catch (error) {
                console.log(error);
            }
            handleClose();
            navigate(0);
        }
        else {
            toast('type something or select an image', {
                icon: '⚠️',
            });
        }

    }
    return (
        <>
            <Modal
                opened={createModalOpen}
                onClose={handleClose}
                title="   Share Post"
                size="lg"
                radius="md"
            >
                <form className="p-4 font-poppins flex flex-col gap-4 text-sm text-text-primary" onSubmit={handleSubmit}>

                    {/* profile  */}
                    <div className=' flex gap-2 w-[90%] text-xs  items-center'>
                        <img className='w-10 h-10 object-cover rounded-full bg-black' src={profilePicture} alt='dp' />
                        <div>
                            <div className='font-semibold capitalize '>{user.data.fname + " " + user.data.lname}</div>
                            <span className=' dark:text-text-secondary-dark' >@{user.data.username}</span>
                        </div>
                    </div>

                    {/* text  */}
                    <div >
                        <h1 className=" font-semibold ">What do you want to talk about? </h1>
                        <textarea className=" min-h-[70px] h-auto w-full pt-2  focus:outline-none" value={postData?.caption} onChange={(e) => setPostData({ ...postData, caption: e.target.value })} />
                    </div>

                    {/*image  */}
                    <div className=" flex flex-col  items-center justify-center bg-background-secondary  border " >
                        <img className=" max-h-[200px] object-contain " src={postData.url} />
                    </div>
                    {/* options */}
                    <ul className='flex gap-8   items-center'>
                        <li className='flex gap-2  items-center ' onClick={() => fileRef.current.click()}  >
                            <BsFillImageFill size={"15px"} />
                            <span>Photo</span>
                        </li>
                        <li className='flex gap-2  items-center'>
                            <BsFillCameraVideoFill size={"15px"} />
                            <span>video</span>
                        </li>
                        <li className='flex gap-2  items-center' >
                            <TiLocation size={"15px"} />
                            <span>Location</span>
                        </li>
                        <li className='flex gap-2  items-center' >
                            <BsCalendar2EventFill size={"15px"} />
                            <span>Event</span>
                        </li>
                    </ul>

                    <button type="submit" className='bg-accent rounded-xl p-1 py-2 text-white font-semibold'> Post</button>
                </form>
                <input className='hidden' type='file' accept="image/*" ref={fileRef} onChange={onImageChange} />

            </Modal>

            {/* <Group position="center">
                <Button onClick={() => setOpened(true)}>imageModalOpen Modal</Button>
            </Group> */}
        </>
    );
}