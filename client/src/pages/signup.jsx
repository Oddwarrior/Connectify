import React, { useState } from 'react';
import video from '../assets/SignupVideo.mp4'
const Signup = () => {
    return (
        <div className='flex flex-col md:grid md:grid-cols-[600px_auto]  overflow-hidden '>
            < div className=' hidden md:block bg-accent w-full h-screen relative '>
                <div className=' absolute m-auto w-full  pl-32 pt-40  text-white  font-bold z-10'>
                    <h1 className='  text-6xl'>Connectify</h1>
                    <span className='p-2 pt-6 text-lg'>Discover, Connect, Share </span>
                </div>
                <div className=' bg-black bg-opacity-50 w-full h-full absolute'></div>
                <video className=' object-cover w-full h-full' src={video} autoPlay loop muted ></video>
            </ div>
            <SignupForm />
        </div >
    )
}

export default Signup

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform signup logic here
        console.log('Signup form submitted');
        console.log('Email:', email);
        console.log('Username:', username);
        console.log('Password:', password);
        // Reset form fields
        setEmail('');
        setUsername('');
        setPassword('');
    };

    return (
        <div className=" w-full h-full flex justify-center items-center bg-background">
            <form className="md:w-3/4 pt-20 flex flex-col gap-4 rounded-xl p-8 " onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-8">Sign Up</h2>
                <div className=' flex flex-col justify-center '>
                    <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className=" appearance-none  text-sm border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-accent focus:shadow-accent"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className=' flex flex-col justify-center '>
                    <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className=" appearance-none text-sm  border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none  focus:border-accent  focus:shadow-accent"
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className=' flex flex-col justify-center '>
                    <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className=" appearance-none  text-sm border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none  focus:border-accent focus:shadow-accent"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="pt-4 w-full flex  items-baseline justify-between">
                    <h1 className='cursor-pointer text-sm hover:underline'>Already have an account? <span className=''> Login </span> </h1>
                    <button
                        className=" bg-accent hover:bg-black duration-300 text-white font-semibold py-2 px-4 rounded-full focus:outline-none  focus:border-accent focus:shadow-accent"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};


