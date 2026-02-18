const Projects_card = (props) => {
  return (
    <div className="w-75 h-auto bg-[#F0F0F0] text-black flex flex-col items-center pt-7 rounded-[15px] relative ">
      <div className=" w-[80%] border-2 ">
        <img src={props.image} alt="" width={`${props.size}px`}/>
      </div>
      <div className="w-[95%] pl-6 flex flex-col flex-wrap mt-3 gap-5 text-wrap font-astasans font-bold">
        <p className="text-xl">Title: {props.Title} </p>
        <p className="wrap-anywhere">Github Link: <a href={props.githublink} target="_blank" className="underline text-blue-600">{props.githublink}</a></p>
        <p className="pb-2"><span className="font-extrabold">Description: </span>{props.description} </p>
      </div>
    </div>
  )
}

export default Projects_card
