import React from 'react'

const SkeletonTweet = () => {
  return (
    <div className="w-full mx-auto animate-pulse px-9 py-6 border-b dark:border-white/20 border-black/5 bg-white dark:bg-black text-[#536471] dark:text-[#e7e9ea]">
    <h1 className="h-2 bg-gray-300 rounded-lg w-52 dark:bg-gray-600"></h1>
    <p className="w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    <p className="w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    <p className="w-4/5 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
</div>
  )
}

export default SkeletonTweet
