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
        <Card className='mt-2'>
            <div className=' px-6 p-4 font-semibold'>Trending</div>
            <div className='overflow-auto px-4 h-44'>
                {
                    trendingHashtags.map((hastag) => (
                        <div key={hastag} className=' w-full rounded-xl p-1  flex justify-between items-center gap-4 text-sm'>
                            {hastag}
                        </div>
                    ))
                }
            </div>
        </Card>


    )

}

export default TrendingCard