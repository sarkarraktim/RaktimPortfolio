import React from 'react'

const Projects_card_skeleton = () => {
  return (
    <div className="w-75 h-auto bg-[#F0F0F0] text-black flex flex-col items-center pt-7 rounded-[15px] relative animate-pulse ">
      <div className=" w-[80%] h-50 bg-[#acacac] ">
        
      </div>
      <div className="w-full pl-6 flex flex-col mt-3 gap-2 text-wrap pb-3">
        <div className='w-50 h-4 bg-[#acacac]'></div>
        <div className='w-50 h-4 bg-[#acacac]'></div>
        <div className='w-50 h-4 bg-[#acacac]'></div>
      </div>
    </div>
  )
}

export default Projects_card_skeleton
