import React from 'react'
import LeftBar from '../componenets/LeftBar'
import RightBar from '../componenets/RightBar'
import Middle from '../componenets/Middle'
import { Toaster } from 'react-hot-toast'

export default function Home() {
    return (
        <div className=' flex flex-col lg:grid md:overflow-hidden lg:grid-cols-[22%_50%_28%]'>
            <Toaster />
            <LeftBar />
            <Middle />
            <RightBar />
        </div>
    )
}
