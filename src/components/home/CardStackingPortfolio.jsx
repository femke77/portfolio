import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CardStackingPortfolio.css";
import ScrollingText from "./ScrollingText";
import data from "../../utils/projectdata.json";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router-dom";
import Box from "@mui/system/Box";
import TextScrambleComponent from "./TextScramble";


// FIXME BELOW 900 NEEDS WORK
// xs, extra-small: 0px
// sm, small: 600px

// LOOKS GOOD:
// md, medium: 900px -
// lg, large: 1200px -
// xl, extra-large: 1536px -

// When the screen gets really huge, maybe just reduce center container size

// FIXME : spacing between scrolling text and cards and below cards all needs updating
// including max height??? for the cards

gsap.registerPlugin(ScrollTrigger);

const styles = {
  buttonStyles: {
    border: "1px solid black",
    borderRadius: "10px",
    width: "100%",
    textAlign: "center",
    padding: "4px",
    marginTop: "5px",
  },
};

const ProcessAnimation = () => {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const sections = sectionsRef.current;

    const calculateXPercent = (index) => {
      if (window.innerWidth >= 1200) {
        if (index === data.length) {
          return -index * 31.5;
        }
        return -index * 100 + (index > 0 ? 4.5 * index : 0);
      } else {
        if (index === data.length) {
          return -index * 46.5;
        }
        return -index * 100 + (index > 0 ? 4.5 * index : 0);
      }
    };

  
    // const ctx = gsap.context(() => {
    //   const mm = gsap.matchMedia();

    //   mm.add("(min-width: 900px)", () => {
    //     // Horizontal scroll effect
    //     gsap.to(sections, {
    //       xPercent: (i) => calculateXPercent(i),
    //       duration: (i) => 0.5 * i,
    //       ease: "none",
    //       scrollTrigger: {
    //         trigger: containerRef.current,
    //         pin: true,
    //         scrub: 0.1,
    //         start: "top top",
    //         end: `+=${sections.length * 600}vw`,
    //         invalidateOnRefresh: true,
    //       },
    //     });
    //   });

    //   return () => {
    //     mm.revert();
    //   };
    // });

    // return () => {
    //   ctx.revert();
    // };


    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
    
      mm.add("(min-width: 900px)", () => {
     
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 0.1,
            start: "top 30vh",
            end: () => "+=" + containerRef.current.offsetWidth, 
            invalidateOnRefresh: true,
          },
        })
    
    
        .to(sections, {
          xPercent: (i) => calculateXPercent(i), 
          ease: "none",
          duration: (i)=>5*i ,
        })
    
        // Adds a pause at the end of the animation
        .set({}, {}, "+=15");  // Change this number to increase or decrease the pause
 
      });
    
      return () => {
        mm.revert();
      };
    });
    
    return () => {
      ctx.revert();
    };
    

  }, []);

  return (
    <div ref={containerRef} id="projects" style={{ overflow: "hidden", marginBottom:"50px"}}>
      <ScrollingText />

      <div className="pin-process">
        {data.map((project, index) => (
          <Box
            ref={(el) => (sectionsRef.current[index] = el)}
            className="process-item-wrapper"
            sx={{ width: { md: "35vw", lg: "25vw", xl: "25vw" } }} // adjusting these also means adjusting the calculateXPerfect function
            key={project.name}
          >
            <ProjectCard project={project} index={index + 1} />
          </Box>
        ))}

        {/* Last card not in map, static */}
        <Box
          className="process-item-wrapper-last"
          ref={(el) => (sectionsRef.current[data.length] = el)}
          sx={{ width: { md: "72vw", lg: "76vw", xl: "76vw" } }} // adjusting these also means adjusting the calculateXPercent function
        >
          <div style={{ display: "flex" }}>
            <div style={{ padding: "25px", flexBasis: "45%" }}>
              <div>Contact </div>
              <h1 style={{ fontSize: "clamp(1.5rem, 2.5rem, 4.5rem)" }}>
                Let's Work Together!
              </h1>
              <div style={{ marginLeft: "25px" }}>
                <div
                 style={
                  styles.buttonStyles
                }
                >
                  <TextScrambleComponent
                    phrases={[
                      "Email Adam!",
                      "001110001111",
                      "adammathis.dev@gmail.com",
                    ]}
                    style={{ fontWeight: "bold" }}
                  />
                </div>
                <div
                  style={
                    styles.buttonStyles
                  }
                >
                  <TextScrambleComponent
                    phrases={["Call Now!", "001110001111", "636.284.6762"]}
                    style={{ fontWeight: "bold" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ padding: "60px 30px 60px 0px", flexBasis: "60%" }}>
              {" "}
              <p>
                We are always happy to talk. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Sit consequatur rerum sapiente
                excepturi deserunt ducimus voluptates deleniti alias nemo
                doloribus beatae vero harum quas enim
              </p>
              <button
                onClick={() => navigate("/Contact")}
                style={{
                  background: "black",
                  color: "white",
                  borderRadius: "10px",
                  height: "50px",
                  width: "150px",
                }}
              >
                Contact Now
              </button>
            </div>
          </div>
        </Box>
      </div>
      <div className="place-holder"></div>
    </div>
  );
};

export default ProcessAnimation;
