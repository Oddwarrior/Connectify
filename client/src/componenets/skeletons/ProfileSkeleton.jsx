import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Card from "../Card"
import { PostSkeleton } from './PostSkeleton'

const ProfileSkeleton = () => {
    return (
        <div className='flex flex-col gap-2 md:gap-3 md:p-3  w-full '>
            <Card className=" overflow-hidden w-full relative">
                <div className='pl-12 pt-20 ' >
                    <Skeleton circle={true} height={"150px"} width={"150px"} />
                </div>
                <div className=' grid grid-cols-2  w-full  px-4'>
                    <div className=' flex  flex-col   gap-2 p-4'>
                        <section className=' flex flex-col '>
                            <h1 className=' font-bold  dark:text-white text-xl capitalize'><Skeleton /></h1>
                            <h1 className=' dark:text-text-primary-dark ' ><Skeleton /></h1>
                            <h1 className=' text-xs text-text-secondary pt-2  line-clamp-3'><Skeleton /> </h1>
                        </section>
                        <ul className=' flex pt-2 gap-4  justify-start text-sm'>
                            <li className=' flex gap-2 items-center justify-center  '>
                                <Skeleton />
                                <span> <Skeleton /></span>
                            </li>
                            <li className=' flex gap-2 items-center justify-center '>
                                <h1 className='font-semibold  '><Skeleton /></h1>
                                <Skeleton />
                            </li>
                            <li className=' flex gap-2  items-center justify-center '>
                                <h1 className='font-semibold  '><Skeleton /></h1>
                                <Skeleton />
                            </li>
                        </ul>
                    </div>
                </div>
            </Card>
            <section className='flex flex-col gap-3'>

            </section>
            <PostSkeleton />
        </div>
    )
}

export default ProfileSkeleton