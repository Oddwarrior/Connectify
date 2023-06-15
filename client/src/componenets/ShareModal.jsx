import { useState, useRef } from "react";
import { Modal, Button, Group } from "@mantine/core";

export default function ShareModal({ open, setOpen }) {
    const [image, setImage] = useState("");
    const fileRef = useRef();
    const onImageChange = (e) => {
        const img = e.target.files?.[0];
        if (img) setImage({ image: URL.createObjectURL(img) });
    }
    return (
        <>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title="Share Post"
                size="lg"
                radius="md"
            >
                <div className="p-4">
                    <div className="h-[400px] bg-gray-500" onClick={() => fileRef.current.click()} > upload image
                        <img src={image.image} />
                    </div>
                </div>
                <input className='hidden' type='file' ref={fileRef} onChange={onImageChange} />

            </Modal>

            {/* <Group position="center">
                <Button onClick={() => setOpened(true)}>Open Modal</Button>
            </Group> */}
        </>
    );
}