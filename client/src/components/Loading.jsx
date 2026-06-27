import React from 'react'
// it will show when movie .id (detail of a movie) is not loaded yet or there is wrong id
const Loading = () => {
  return (
    <div className='flex justify-center items-center h-[80vh]'>
        <div className='animate-spin rounded-full h-14 w-14 border-2 border-primary border-t-transparent'></div>   
    </div>
  )
}

export default Loading
