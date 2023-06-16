import React from 'react'
import Card from './Card'

const Profile = () => {
    return (

        <Card className=" overflow-hidden w-full relative">
            <div className="h-[150px]">
                <img className=" h-full w-full object-cover" src="https://photofocus.com/wp-content/uploads/2022/08/kenlee-AI-generated-art-drawing-man-forest-Midjourney-HEADER-PHOTOFOCUS.jpg" />
            </div>
            <img className=' absolute m-auto  top-16  left-16 w-40 h-40 object-cover shadow-md rounded-full bg-black' src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt='dp' />

            <div className=' flex  w-full  p-4'>
                <div className=' flex  flex-col w-[40%] items-center gap-2 p-4'>
                    <section className=' flex flex-col items-center justify-center pt-16'>
                        <hi className=' font-bold  dark:text-white text-xl'>Shashank Jagtap</hi>
                        <h1 className=' dark:text-text-secondary-dark ' >@shashak.jagtap</h1>
                    </section>
                    <ui className=' flex  gap-4 justify-center items-center'>
                        <li className=' flex flex-col items-center justify-center  '>
                            <h1 className='font-semibold text-base text-accent'>6</h1>
                            <span> Posts</span>
                        </li>
                        <li className=' flex flex-col items-center justify-center '>
                            <h1 className='font-semibold text-base text-accent'>600</h1>
                            <span> Posts</span>
                        </li>
                        <li className=' flex flex-col items-center justify-center '>
                            <h1 className='font-semibold text-base text-accent'>403</h1>
                            <span> Posts</span>
                        </li>
                    </ui>
                </div>
                <div>
                    hi
                </div>
            </div>
        </Card>

    )
}

export default Profile