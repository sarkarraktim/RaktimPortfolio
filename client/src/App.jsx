import { useEffect, useState } from 'react'
import Navbar_header from './components/Navbar_header'
import Skills_card from './components/Skills_card'
import Skills_card_skeleton from './components/Skills_card_skeleton'
import Projects_card_skeleton from './components/Projects_card_skeleton'
import Projects_card from './components/Projects_card'
import Navbar_footer from './components/Navbar_footer'
import download_arrow from "./assets/images/download_arrow.svg"



const App = () => {

  const [skillsData, setskillsData] = useState([]);
  const projobj = {
    ott: {
      githublink: "https://github.com/sarkarraktim/IBM-Final-project.git",
      desc: "This is an OTT web application"
    },
    weather: {
      githublink: "https://github.com/sarkarraktim/PRJECT_1-Climate-webapp.git",
      desc: "This is weather web application project."
    }
  };

  // Skeleton loading
  useEffect(()=>{
    const skills_Container_card_skeleton = document.querySelectorAll(".skills_Container_card_skeleton");
    const skills_Container_card = document.querySelectorAll(".skills_Container_card");
    const projects_container_card_skeleton = document.querySelector(".projects_container_card_skeleton");
    const projects_container_card = document.querySelector(".projects_container_card");

    (function skeletonLoading() {
      setTimeout(() => {
        skills_Container_card_skeleton.forEach(skeleton =>{
          if(skeleton instanceof HTMLElement) {
            skeleton.style.visibility = 'hidden'
          }
        })

        skills_Container_card.forEach(card =>{
          if(card instanceof HTMLElement) {
            card.style.visibility = 'visible'
          }
        });

        projects_container_card_skeleton instanceof HTMLElement ? 
        projects_container_card_skeleton.style.visibility = 'hidden' :null
        projects_container_card instanceof HTMLElement ? 
        projects_container_card.style.visibility = 'visible' :null

      }, 2000);
    })();

    (async function APIfetch() {
      const res = await fetch('http://localhost:8080/api/items', {method: 'GET'})
      if(res.ok){
        const {APIdata} = await res.json();
        setskillsData(APIdata);
      } else {
        const err = await res.json();
        console.log(err.message)
      }
    })();
  }, []);

  // Download Button:
  useEffect(()=>{
    const downloadbutt = document.getElementById('downloadbutt');
    downloadbutt.onclick = () =>{
      const dfile = skillsData.find((e) => e.b_iName.includes('RAKTIM RESUME') && e.b_fileurl.endsWith('.pdf'));
      if(dfile) {
        let href = dfile.b_fileurl;
        if (href.startsWith('/')) href = `http://localhost:8080${href}`;
        const a = document.createElement('a');
        a.href = href;
        a.download = '';
        a.click();
        a.remove();
      }

    }
  },[skillsData])



  return (
    <>
    <div className='max-w-screen w-full h-auto bg-[#33393C]'>
      <header>
        {/*header navbar */}
        <Navbar_header />
      </header>
      <main className='w-full flex flex-col justify-center items-center pb-18'>

        {/* About */}
        <div className='w-[70%] h-auto relative mt-20 text-[white] | max-lg:w-[90vw] '>
          <p id='myabout' className={` w-[50%] text-[40px] underline font-momotrustdisplay decoration-3 | max-sm:w-full `}>About</p>
          <div className='max-xl:flex max-xl:w-full max-xl:justify-center max-xl:pt-15 '>
            {/* Photo */}
            <div className='w-60 h-60 absolute top-11 right-0 bg-[#D9D9D9] rounded-full flex justify-center items-center overflow-hidden | max-xl:static '>
              {
                skillsData.filter((e) => e.b_iName.includes('Raktim Photo')).map((e, i)=> (
                  <img key={i} src={`http://localhost:8080${e.b_images}`} className='scale-106 mt-18'></img>
                ))
              }
            </div>
          </div>
          <p className='font-astaSans font-bold text-6xl pt-10'>Hi</p>
          <p className='text-2xl font-AstaSans font-bold pl-0.5 pt-3'>I am Raktim</p>
          <p className='text-[18px] w-150 pt-3 font-AstaSans pl-0.5 | max-sm:w-full '>
            I am an enthusiastic Full-Stack Stack Developer, focused on modern web development, design and most popular tools and technology's. And I specialize MERN (MongoDB, Express, React) and PERN (PostgreSQL, Express, React, Node.js) Stack. And also with problem solving, concise coding strategy. 
            <br />
            Beyond coding I have years of Experience in Adobe software's(Photoshop, Illustrator), Figma and Microsoft software's(Word, Excel, Power Point presentation).
          </p>
        </div>

        {/* Skills */}
        <div  className="w-[70%] h-auto mt-40 text-white | max-lg:w-[90vw] max-xl:h-auto ">
          <p id='myskills' className={` w-[60%] font-momotrustdisplay text-[40px] underline decoration-3 | max-sm:w-full `} >My Skills</p>
          {/* Coding */}
          <p className='pt-8 font-titilliumweb font-extrabold text-[30px] underline decoration-wavy decoration-2 underline-offset-8 '>Coding:</p>
          <div className='w-[60%] mt-5 relative | max-xl:w-full '>
            {/* skeleton */}
            <div className="skills_Container_card_skeleton flex flex-wrap gap-4 ">
                {
                  skillsData.sort((a, b) => {
                    const aID = Number(a.b_iID);
                    const bID = Number(b.b_iID);
                    if (!Number.isNaN(aID) && !Number.isNaN(bID)) return aID - bID;
                  }).slice(0, 9).filter((e) => !e.b_fileurl.toLowerCase().endsWith('.pdf') && !e.b_iName.includes('Raktim Photo')).map(() => (
                    <Skills_card_skeleton/>
                  ))
                }
            </div>
            {/* content */}
            <div className="skills_Container_card flex flex-wrap gap-4 absolute top-0 invisible ">
              {
                skillsData.sort((a,b)=>{
                  const aID = Number(a.b_iID);
                  const bID = Number(b.b_iID);
                  if(!Number.isNaN(aID) && !Number.isNaN(bID)) return aID - bID;
                }).slice(0, 9).filter((e) => !e.b_fileurl.toLowerCase().endsWith('.pdf') && !e.b_iName.includes('Raktim Photo')).map((e, i) =>(
                  <Skills_card size="58" key={i} name={e.b_iName} image={`http://localhost:8080${e.b_images}`}/>
                ))
              }
            </div>

          </div>

          {/* Beyond Coding */}
          <p className='mt-8 font-titilliumweb font-extrabold text-[30px] underline decoration-wavy decoration-2 underline-offset-8 '>Beyond Coding:</p>
          <div className='w-[60%] mt-5 relative | max-xl:w-full '>
            {/* skeleton */}
            <div className="skills_Container_card_skeleton flex flex-wrap gap-4">
                {
                  skillsData.sort((a, b) => {
                    const aID = Number(a.b_iID);
                    const bID = Number(b.b_iID);
                    if (!Number.isNaN(aID) && !Number.isNaN(bID)) return aID - bID;
                  }).slice(9, 15).filter((e) => !e.b_fileurl.toLowerCase().endsWith('.pdf') && !e.b_iName.includes('Raktim Photo')).map(() => (
                    <Skills_card_skeleton/>
                  ))
                }
            </div>
            {/* content */}
            <div className="skills_Container_card flex flex-wrap gap-4 absolute top-0 invisible ">
              {
                skillsData.sort((a, b)=>{
                  const aID = Number(a.b_iID);
                  const bID = Number(b.b_iID);
                  if(!Number.isNaN(aID) && !Number.isNaN(bID)) return aID - bID;
                }).slice(9, 15).filter((e) => !e.b_fileurl.toLowerCase().endsWith('.pdf') && !e.b_iName.includes('Raktim Photo')).map((e, i)=>(
                  <Skills_card size='45' key={i} name={e.b_iName} image={`http://localhost:8080${e.b_fileurl}`}/>
                ))
              }
            </div>

          </div>

        </div>

        {/* Projects */}
        <div className='w-[70%] h-auto mt-40 text-white | max-lg:w-[90vw] max-xl:h-auto '>
          <p id='myprojects' className='text-[40px] underline font-momotrustdisplay decoration-3 '>Projects</p>
          <div className='w-full relative'>

            <div className="projects_container_card_skeleton flex flex-wrap pt-15 absolute top-0 gap-4">
                {
                  skillsData.sort((a, b) => {
                    const aID = Number(a.b_iID);
                    const bID = Number(b.b_iID);
                    if (!Number.isNaN(aID) && !Number.isNaN(bID)) return aID - bID;
                  }).slice(15, 17).filter((e) => !e.b_fileurl.toLowerCase().endsWith('.pdf') && !e.b_iName.includes('Raktim Photo')).map(() => (
                    <Projects_card_skeleton/>
                  ))
                }
            </div>

            <div className="projects_container_card flex flex-wrap pt-15 gap-4 invisible |  ">
              {/* OTT Web App */}
              {
                skillsData.sort((a, b)=>{
                  const aID = Number(a.b_iID);
                  const bID = Number(b.b_iID);
                  if (!Number.isNaN(aID) && !Number.isNaN(bID)) return aID - bID;
                }).slice(15, 16).filter((e) => !e.b_fileurl.toLowerCase().endsWith('.pdf') && !e.b_iName.includes('Raktim Photo')).map((e, i)=>(
                  <Projects_card key={i} Title={e.b_iName} image={`http://localhost:8080${e.b_images}`} size="300" githublink={projobj.ott.githublink} description={projobj.ott.desc} />
                ))
              }
              {/* Climate weather web App */}
              {
                skillsData.sort((a, b)=>{
                  const aID = Number(a.b_iID);
                  const bID = Number(b.b_iID);
                  if (!Number.isNaN(aID) && !Number.isNaN(bID)) return aID - bID;
                }).slice(16, 17).filter((e) => !e.b_fileurl.toLowerCase().endsWith('.pdf') && !e.b_iName.includes('Raktim Photo')).map((e, i)=>(
                  <Projects_card key={i} Title={e.b_iName} image={`http://localhost:8080${e.b_images}`} size="300" githublink={projobj.weather.githublink} description={projobj.weather.desc} />
                ))
              }
            </div>

          </div>
        </div>

        {/* Download button */}
        <div className='controls w-[70%] mt-10 flex flex-col items-end gap-5 | max-sm:w-full max-sm:pr-6 '>
          <div className='w-45 h-auto flex justify-center'>
              <img className='w-15 h-15 rotate-90' src={download_arrow} alt={download_arrow} />
          </div>
            <button id='downloadbutt' type='button' className='w-45 h-12 bg-[#3434f8] text-white font-bold rounded-[5px] hover:bg-[#5353f7] hover:cursor-pointer active:scale-95 select-none '>Download My Resume</button>
        </div>
      </main>
      <footer>
        {/* footer navbar */}
        <Navbar_footer/>
      </footer>
    </div>
    </>
  )
}

export default App
