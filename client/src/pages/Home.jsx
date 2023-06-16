import React from 'react'
import LeftBar from '../componenets/LeftBar'
import RightBar from '../componenets/RightBar'
import Middle from '../componenets/Middle'
export default function Home() {
    return (
        <div className=' grid md:overflow-hidden lg:grid-cols-[22%_50%_28%]'>
            <LeftBar />
            <Middle />
            <RightBar />
        </div>
    )
}
