import React from 'react'
import { useState, useRef, useEffect } from "react";
import { Modal, Button, Group } from "@mantine/core";
import Card from './Card';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { ENDPOINTS } from '../utils/endpoints';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const EditModal = ({ editModalOpen, setEditModalOpen, profilePhoto, profileBanner }) => {

    const { user, dispatch } = useAuth();
    const intialState = {
        fname: user.data.fname,
        lname: user.data.lname,
        description: user.data.description,
        birthdate: '',
    };
    const [userData, setUserData] = useState(intialState);
    const [saving, setSaving] = useState(false);
    const profilePhotoRef = useRef();
    const profileBannerRef = useRef();
    const [newProfilePhoto, setNewProfilePhoto] = useState({ image: null, url: null });
    const [newProfileBanner, setNewProfileBanner] = useState({ image: null, url: null });

    useEffect(() => {
        setUserData(intialState);
        setNewProfilePhoto(profilePhoto)
        setNewProfileBanner(profileBanner)
    }, [editModalOpen]);

    const navigate = useNavigate();

    const onProfilePhotoChange = (e) => {
        const img = e.target.files?.[0];
        if (img) setNewProfilePhoto(({ image: img, url: URL.createObjectURL(img) }));
    }
    const onProfileBannerChange = (e) => {
        const img = e.target.files?.[0];
        if (img) setNewProfileBanner({ image: img, url: URL.createObjectURL(img) });
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            let url = import.meta.env.VITE_BASE_URL;
            if (newProfilePhoto.image) {
                const profilePicFormdata = new FormData();
                profilePicFormdata.append("image", newProfilePhoto.image);
                profilePicFormdata.append("type", "profilePicture");
                const img = await axios.put(url + ENDPOINTS.UPDATE_PROFILE_PICTURE + user.data._id,
                    profilePicFormdata,
                    {
                        headers: { Authorization: "Bearer " + user.accessToken },
                    }
                );
                userData.profilePhoto = img.data.profilePhoto;
            }

            if (newProfileBanner.image) {
                const profileBannerFormdata = new FormData();
                profileBannerFormdata.append("image", newProfileBanner.image);
                profileBannerFormdata.append("type", "profileBanner");
                const img = await axios.put(url + ENDPOINTS.UPDATE_PROFILE_PICTURE + user.data._id,
                    profileBannerFormdata,
                    {
                        headers: { Authorization: "Bearer " + user.accessToken },
                    }
                );
                userData.profileBanner = img.data.profileBanner;
            }

            const updatedData = await axios.put(url + ENDPOINTS.UPDATE_USER + user.data._id,
                userData,
                {
                    headers: { Authorization: "Bearer " + user.accessToken },
                }
            );
            setSaving(false);
            console.log(updatedData);
            dispatch({ type: "UPDATE_DATA", payload: updatedData.data.user });
            toast.success("Profile Updated");


        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        navigate(0);
        handleClose();
    };
    const handleClose = () => {

        setEditModalOpen(false);
    }

    return (
        <Modal
            opened={editModalOpen}
            onClose={handleClose}
            title=" Edit Profile"
            size="lg"
            radius="md"
            centered
        >
            <form onSubmit={handleSubmit} className="  px-4 pb-4  font-poppins  text-text-primary text-sm flex flex-col gap-2  w-full relative">
                <Card className=" overflow-hidden w-full mb-16 ">
                    <div onClick={() => profileBannerRef.current.click()} className="h-[150px] bg-background-seondary-dark">
                        <img className=" h-full w-full object-cover " src={newProfileBanner.url ?? profileBanner} />
                    </div>

                    <img
                        onClick={() => profilePhotoRef.current.click()}
                        className='absolute m-auto  top-24  left-8 w-32 h-32 object-cover shadow-md rounded-full  bg-opacity-50 dark:bg-backgroundBody-dark'
                        src={newProfilePhoto.url ?? profilePhoto} alt='dp'
                    />
                    {/* <div
                        className=' z-10 absolute m-auto  top-24  left-8 w-32 h-32 object-cover shadow-md rounded-full  bg-black bg-opacity-30 dark:bg-backgroundBody-dark'

                    /> */}


                </Card>
                <input className='hidden' type='file' accept="image/*" ref={profilePhotoRef} onChange={onProfilePhotoChange} />
                <input className='hidden' type='file' accept="image/*" ref={profileBannerRef} onChange={onProfileBannerChange} />

                <div className=" flex gap-2  w-full pt-2">
                    <section className='w-full '>
                        <label htmlFor="fname" className="block mb-2   font-semibold">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            value={userData.fname}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-xl focus:outline-none "
                        />
                    </section>
                    <section className='w-full'>

                        <label htmlFor="fname" className="block mb-2 font-semibold">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lname"
                            name="lname"
                            value={userData.lname}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-xl focus:outline-none "
                        />
                    </section>
                </div>

                <div className="">
                    <label htmlFor="description" className="block mb-2 font-semibold">
                        About
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={userData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-xl focus:outline-none "></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="birthdate" className="block mb-2 font-semibold">
                        Birthdate
                    </label>
                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={userData.birthdate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-xl focus:outline-none " />
                </div>

                <button type="submit"
                    onSubmit={handleSubmit}
                    className='bg-accent rounded-full p-1 py-2 text-white font-semibold focus:text-gray-500'
                >
                    {saving ? "Saving.." : "Save"}
                </button>


            </form>
        </Modal>
    )
}

export default EditModal