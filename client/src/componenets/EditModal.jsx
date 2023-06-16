import React from 'react'
import { useState, useRef } from "react";
import { Modal, Button, Group } from "@mantine/core";

const EditModal = ({ editModalOpen, setEditModalOpen }) => {

    const [userData, setUserData] = useState({
        name: '',
        city: '',
        about: '',
        birthdate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the form data, like save it to a database
        console.log(userData);
        // Reset the form fields
        setUserData({
            name: '',
            city: '',
            about: '',
            birthdate: '',
        });
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
            <form onSubmit={handleSubmit} className="  p-4 text-sm flex flex-col gap-2 ">
                <div className="mb-4">
                    <label htmlFor="profilePhoto" className="block mb-2 font-medium">
                        Profile Photo
                    </label>
                    <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                    />
                </div>

                <div className="">
                    <label htmlFor="name" className="block mb-2 font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-xl focus:outline-none "
                    />
                </div>

                <div className="">
                    <label htmlFor="city" className="block mb-2 font-medium">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={userData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-xl focus:outline-none "
                    />
                </div>

                <div className="">
                    <label htmlFor="about" className="block mb-2 font-medium">
                        About
                    </label>
                    <textarea
                        id="about"
                        name="about"
                        value={userData.about}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-xl focus:outline-none "                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="birthdate" className="block mb-2 font-medium">
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
                    className='bg-accent rounded-full p-1 py-2 text-white font-semibold'
                >
                    Save
                </button>


            </form>
        </Modal>
    )
}

export default EditModal