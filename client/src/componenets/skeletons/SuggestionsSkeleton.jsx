import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SuggestionsSkeleton = () => {
    return (
        <div className=' flex flex-col gap-4'>
            <div className='flex gap-2'>
                <Skeleton circle={true} height={"40px"} width={"40px"} />
                <div>
                    <h1 className=' w-20'><Skeleton /></h1>
                    <h1 className=' w-40'><Skeleton /></h1>
                </div>
            </div>
            <div className='flex gap-2'>
                <Skeleton circle={true} height={"40px"} width={"40px"} />
                <div>
                    <h1 className=' w-20'><Skeleton /></h1>
                    <h1 className=' w-40'><Skeleton /></h1>
                </div>
            </div>
            <div className='flex gap-2'>
                <Skeleton circle={true} height={"40px"} width={"40px"} />
                <div>
                    <h1 className=' w-20'><Skeleton /></h1>
                    <h1 className=' w-40'><Skeleton /></h1>
                </div>
            </div>
            <div className='flex gap-2'>
                <Skeleton circle={true} height={"40px"} width={"40px"} />
                <div>
                    <h1 className=' w-20'><Skeleton /></h1>
                    <h1 className=' w-40'><Skeleton /></h1>
                </div>
            </div>


        </div>
    )
}

export default SuggestionsSkeleton