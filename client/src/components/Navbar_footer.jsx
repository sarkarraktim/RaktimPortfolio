const Navbar_footer = () => {
  return (
    <div id="contactme" className='max-w-screen w-full h-40 bg-[#d9d9d950] text-white rounded-[15px_15px_0_0] flex flex-col justify-center pb-5 | max-xl:h-auto'>
        <nav className='w-full h-full flex items-start gap-37.5 text-white pt-4 pb-8 pl-25 | max-xl:gap-5 | max-sm:w-full max-xl:flex-wrap max-sm:overflow-hidden max-sm:pl-4'>
            <ul className=' w-105 h-full flex flex-col gap-2 '>
                <li className="underline font-astasans font-bold text-2xl">Contact me </li>
          <li className="text-xl flex text-wrap">Email: &nbsp; <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=sarkarraktim@zohomail.in`} target="_blank" className="underline underline-offset-5 text-[#002fff] font-bold">sarkarraktim@zohomail.in</a></li>
            </ul>
        </nav>
        <div className=" w-full flex justify-center text-center text-wrap">Author: Raktim Sarkar <br /> &copy; Copyright 2026 All Right Reserved </div>
    </div>
  )
}

export default Navbar_footer
