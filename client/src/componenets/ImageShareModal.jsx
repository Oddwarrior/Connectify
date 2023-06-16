import { useState, useRef } from "react";
import { Modal, Button, Group } from "@mantine/core";
import { AiOutlineCloudUpload } from 'react-icons/ai'


export default function ImageShareModal({ imageModalOpen, setImageModalOpen }) {
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
        setImageModalOpen(false);
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
                opened={imageModalOpen}
                onClose={handleClose}
                title="Share Post"
                size="lg"
                radius="md"
            >
                <form className="p-4 flex flex-col gap-4 text-sm text-text-primary" onSubmit={handleSubmit}>
                    <div className=" flex flex-col  items-center justify-center bg-background-secondary  border  min-h-[300px]" onClick={() => fileRef.current.click()} >
                        {!image.image && <div className=" flex gap-4 items-center justify-center font-semibold h-full">
                            <AiOutlineCloudUpload size={"20px"} />
                            <h1>Please upload an image</h1>
                        </div>}
                        <img className=" max-h-[300px] object-contain " src={image?.image} />
                    </div>
                    {/* profile  */}
                    <div className=' flex gap-2 w-[90%] text-xs  items-center'>
                        <img className='w-10 h-10 object-contain rounded-full bg-black' src="" alt='dp' />
                        <div>
                            <div className='font-semibold '>Shashank Jagtap</div>
                            <span className=' dark:text-text-secondary-dark' >@shashak.jagtap</span>
                        </div>
                    </div>
                    {/* caption  */}
                    <div >
                        <h1 className=" font-semibold">Caption </h1>
                        <input className=" w-full  border-b-2 p-2 focus:outline-none" value={image?.caption} onChange={(e) => setImage({ ...image, caption: e.target.value })} />
                    </div>

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