import { useEffect, useRef } from "react"

const Navbar_header = () => {
  const about = useRef(null);
  const skills = useRef(null);
  const projects = useRef(null);
  const contact = useRef(null);

  useEffect(()=>{
    const myabout = document.getElementById('myabout');
    const myskills = document.getElementById('myskills');
    const myprojects = document.getElementById('myprojects');
    const contactme = document.getElementById('contactme');

    // About ScrollInto
    if(about.current){
      about.current.addEventListener('click', ()=>{
        myabout.scrollIntoView({behavior:"smooth", block:"start"})
        myabout.style.animation = "none"
        setTimeout(()=>{
          myabout.style.animation = "scrolllinkanimate 3s ease-in-out forwards"
        }, 10)
      })
    }

    // Skills ScrollInto
    if(skills.current){
      skills.current.addEventListener('click', ()=>{
        myskills.scrollIntoView({behavior:"smooth", block:"start"})
        myskills.style.animation = "none"
        setTimeout(()=>{
          myskills.style.animation = "scrolllinkanimate 3s ease-in-out forwards"
        }, 10)
      })
    }

    // Project ScrollInto
    if(projects.current){
      projects.current.addEventListener('click', ()=>{
        myprojects.scrollIntoView({behavior:"smooth", block:"start"})
        myprojects.style.animation = "none"
        setTimeout(()=>{
          myprojects.style.animation = "scrolllinkanimate 3s ease-in-out forwards"
        }, 10)
      })
    }

    // Contact Me ScrollInto
    if(contact.current) {
      contact.current.addEventListener('click', ()=>{
        contactme.scrollIntoView({behavior: 'smooth', block: 'end'})
      })
    }

  }, [])

  return (
    <div className='max-w-screen w-full h-20 bg-[#d9d9d950] text-white rounded-[0_0_15px_15px] | max-xl:h-30'>
      <nav className='w-full h-full flex justify-center'>
        <ul className='list-none w-[70%] h-full flex justify-end items-center gap-12 font-MPLUSRounded font-bold underline text-[28px] | max-sm:gap-5 max-sm:text-[20px]'>
            <li ref={about} className="cursor-pointer">About</li>
            <li ref={skills} className="cursor-pointer">Skills</li>
            <li ref={projects} className="cursor-pointer">Projects</li>
            <li ref={contact} className="cursor-pointer">Contact Me</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar_header
