import React from 'react'
import Card from './Card';

const TrendingCard = () => {
    const trendingHashtags = [
        "#MondayMotivation",
        "#ThrowbackThursday",
        "#FoodieFriday",
        "#SelfieSunday",
        "#FitnessGoals",
        "#TravelDiaries",
        "#TechNews",
        "#FashionInspiration",
        "#BookLovers",
        "#ArtisticExpression",
        // Add more trending hashtags as needed
    ];

    return (
        <Card >
            <div className=' px-6 p-4 font-semibold'>Trending</div>
            <div className='overflow-auto px-6 h-60'>
                {
                    trendingHashtags.map((hastag) => (
                        <div key={hastag} className=' w-full rounded-xl p-1  flex flex-col  text-sm'>
                            <h1 className=' font-semibold'>{hastag}</h1>
                            <h1 className='pl-2 text-sm text-text-secondary dark:text-text-seondary-dark'>1000 posts</h1>
                        </div>
                    ))
                }
            </div>
        </Card>


    )

}

export default TrendingCard