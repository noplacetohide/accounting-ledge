import React from 'react'

export default function Loader() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-600">Loading content...</p>
            </div>
        </div>
    )
}

