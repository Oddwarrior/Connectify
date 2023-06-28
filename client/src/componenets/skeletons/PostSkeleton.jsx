import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Card from "../Card"


export const PostSkeleton = () => {
    return (
        <Card className={'rounded-none md:rounded-xl'}>
            <div className='  w-full rounded-xl  p-6 flex flex-col gap-4 text-sm '>
                <div className='flex gap-4  items-center'>
                    <Skeleton circle={true} height={"45px"} width={"45px"} />
                    <div>
                        <h1 className=' w-28'><Skeleton /></h1>
                        <h1 className=' w-40'><Skeleton height={"10px"} /></h1>
                    </div>
                </div>

                <div className='w-full'>
                    <Skeleton height={"500px"} />
                </div>
                <div className=' w-52'>
                    <Skeleton />
                </div>


            </div>
        </Card>
    )
}
