import React from 'react'

const Card = ({ children, className }) => {
    return (
        <div className={`bg-background rounded-xl w-full dark:bg-opacity-80 dark:bg-background-dark text-sm ${className}`}>
            {children}
        </div>
    )
}

export default Card