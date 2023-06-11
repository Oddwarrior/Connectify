import React from 'react'

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
        <div className=' bg-background rounded-xl w-full  mt-4 text-text-primary text-sm '>
            <div className=' px-6 p-4 font-semibold'>Trending</div>
            <div className='overflow-auto px-4 h-44'>
                {
                    trendingHashtags.map((hastag) => (
                        <div className=' w-full rounded-xl p-1  flex justify-between items-center gap-4 text-sm'>
                            {hastag}
                        </div>
                    ))
                }
            </div>
        </div>


    )

}

export default TrendingCard