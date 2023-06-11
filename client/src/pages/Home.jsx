import React from 'react'
import LeftBar from '../componenets/LeftBar'
import RightBar from '../componenets/RightBar'
import Middle from '../componenets/Middle'
export default function Home() {
    return (
        <div className=' grid  lg:grid-cols-[22rem_auto_24rem]'>
            <LeftBar />
            <Middle />
            <RightBar />
        </div>
    )
}
