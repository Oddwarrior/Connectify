import React from 'react'
import LeftBar from '../componenets/LeftBar'
import RightBar from '../componenets/RightBar'
export default function Home() {
    return (
        <div className='home'>
            <LeftBar />
            <div>middle</div>
            <RightBar />
        </div>
    )
}
