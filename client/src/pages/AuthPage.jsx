import React, { useState } from 'react';
import video from '../assets/SignupVideo.mp4'
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
const AuthPage = () => {
    return (
        <div className='flex flex-col md:grid md:grid-cols-[600px_auto]  overflow-hidden '>
            <Toaster />
            < div className=' bg-accent w-full h-40 md:h-screen relative '>
                <div className=' absolute m-auto w-full  pl-10 pt-10 lg:pl-32 lg:pt-40  text-white  font-bold z-10'>
                    <h1 className='  text-6xl'>Connectify</h1>
                    <span className='p-2 pt-6 text-lg'>Discover, Connect, Share </span>
                </div>
                <div className=' bg-black bg-opacity-50 w-full h-full absolute'></div>
                <video className=' object-cover w-full h-full' src={video} autoPlay loop muted ></video>
            </ div>
            {<Outlet />}
        </div >
    )
}

export default AuthPage



