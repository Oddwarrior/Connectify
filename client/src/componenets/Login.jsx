import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform signup logic here
        console.log('Login form submitted');
        console.log('Username:', username);
        console.log('Password:', password);
        // Reset form fields
        setUsername('');
        setPassword('');
    };

    return (
        <div className=" w-full h-full flex justify-center items-center bg-background dark:bg-backgroundBody-dark">
            <form className="lg:w-3/4 pt-10 flex flex-col gap-4 rounded-xl px-6  " onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6">Login</h2>

                <div className=' flex flex-col justify-center '>
                    <label className="text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className=" appearance-none text-sm  border rounded-xl w-full py-3 px-3  dark:bg-background-dark dark:border-none leading-tight focus:outline-none  focus:border-accent  focus:shadow-accent"
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className=' flex flex-col justify-center '>
                    <label className=" text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className=" appearance-none  text-sm border rounded-xl w-full py-3 px-3  dark:bg-background-dark dark:border-none leading-tight focus:outline-none  focus:border-accent focus:shadow-accent"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="pt-4 w-full flex  items-baseline justify-between">
                    <h1 className='cursor-pointer text-sm hover:underline'>Don't have an account? <span onClick={() => navigate('/auth/signup')}> Signup </span> </h1>
                    <button
                        className=" bg-accent hover:bg-black duration-300 text-white font-semibold py-2 px-4 rounded-full focus:outline-none  focus:border-accent focus:shadow-accent"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

