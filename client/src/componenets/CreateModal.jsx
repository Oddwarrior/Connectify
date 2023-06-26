import { useState, useRef } from "react";
import { Modal, Button, Group } from "@mantine/core";
import { TiLocation } from "react-icons/ti"
import { BsFillImageFill, BsFillCameraVideoFill } from 'react-icons/bs';
import { BsCalendar2EventFill } from "react-icons/bs"

export default function CreateModal({ createModalOpen, setCreateModalOpen }) {
    const initial = {
        image: "",
        caption: "",
        date: new Date().getTime()
    }
    const [image, setImage] = useState(initial);
    const fileRef = useRef();

    const onImageChange = (e) => {
        const img = e.target.files?.[0];
        if (img) setImage({ ...image, image: URL.createObjectURL(img) });
    }
    const handleClose = () => {
        setCreateModalOpen(false);
        setImage(initial);
        console.log(image);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (image.image) {
            handleClose();
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
                        <img className='w-10 h-10 object-contain rounded-full bg-black' src="" alt='dp' />
                        <div>
                            <div className='font-semibold '>Shashank Jagtap</div>
                            <span className=' dark:text-text-secondary-dark' >@shashak.jagtap</span>
                        </div>
                    </div>

                    {/* text  */}
                    <div >
                        <h1 className=" font-semibold ">What do you want to talk about? </h1>
                        <textarea className=" min-h-[100px] w-full pt-2  focus:outline-none" value={image?.caption} onChange={(e) => setImage({ ...image, caption: e.target.value })} />
                    </div>

                    {/*image  */}
                    <div className=" flex flex-col  items-center justify-center bg-background-secondary  border " >
                        <img className=" max-h-[200px] object-contain " src={image?.image} />
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