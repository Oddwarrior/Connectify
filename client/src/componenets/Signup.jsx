import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform signup logic here
        console.log('Signup form submitted');
        console.log('Email:', email);
        console.log('Fname:', fname);
        console.log('Lname:', lname);
        console.log('Username:', username);
        console.log('Password:', password);
        // Reset form fields
        setEmail('');
        setUsername('');
        setPassword('');
    };

    return (
        <div className=" w-full h-full flex justify-center items-center bg-background dark:bg-backgroundBody-dark">
            <form className="lg:w-3/4 pt-10 flex flex-col gap-4 rounded-xl px-6  " onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                <div className=' flex flex-col justify-center '>
                    <label className="text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className=" appearance-none  text-sm border rounded-xl w-full py-3 px-3 dark:bg-background-dark dark:border-none  leading-tight focus:outline-none focus:border-accent focus:shadow-accent"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className=' flex w-full gap-4'>
                    <section className='w-full flex flex-col gap-2'>
                        <label className="text-sm font-bold " htmlFor="First name">
                            First Name
                        </label>
                        <input
                            className=" appearance-none text-sm  border rounded-xl w-full py-3 px-3  dark:bg-background-dark dark:border-none leading-tight focus:outline-none  focus:border-accent  focus:shadow-accent"
                            type="text"
                            placeholder="Enter your first name"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            required
                        />
                    </section>
                    <section className='w-full flex flex-col gap-2'>
                        <label className="text-sm font-bold " htmlFor="username">
                            Last Name
                        </label>
                        <input
                            className=" appearance-none text-sm  border rounded-xl w-full py-3 px-3  dark:bg-background-dark dark:border-none leading-tight focus:outline-none  focus:border-accent  focus:shadow-accent"
                            type="text"
                            placeholder="Enter your last name"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            required
                        />
                    </section>

                </div>
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
                    <h1 className='cursor-pointer text-sm hover:underline'>Already have an account? <span onClick={() => navigate('/auth/login')}> Login </span> </h1>
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

