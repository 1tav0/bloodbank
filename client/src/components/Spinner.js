import React from 'react'

const Spinner = () => {
  return (
    <div className='fixed inset-0 bg-black opacity-70 z-50 flex justify-center items-center'>
        <div className='border-2 h-8 w-8 border-white border-solid border-t rounded-full animate-spin ' ></div>
    </div>
  )
}

export default Spinner