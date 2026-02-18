const Skills_card = (props) => {
  return (
    <div className="w-37.5 h-45 pt-3 bg-[#e0e0e0] text-[black] flex flex-col items-center gap-5 rounded-[15px] | ">
      <p className="text-center font-astasans font-bold">{props.name}</p>
      <div className=" w-20 h-20 rounded-full flex justify-center items-center bg-[#bebebe] overflow-hidden "><img src={props.image} alt="" width={`${props.size}px`} /></div>
    </div>
  )
}

export default Skills_card