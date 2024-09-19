import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CardStackingPortfolio.css";
import ScrollingText from "./ScrollingText";
import data from "../../utils/projectdata.json";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ProcessAnimation = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const sections = sectionsRef.current;

    const calculateXPercent = (index) => {
      if (index === data.length) {
        // last card is the larger 'work together' card
        return -index * 32;
      }
      return -index * 100 + (index > 0 ? 4.5 * index : 0);
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 767px)", () => {
        // Horizontal scroll effect
        gsap.to(sections, {
          xPercent: (i) => calculateXPercent(i),
          duration: (i) => 0.5 * i,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 0.1,

            start: "top -70",
            end: `+=${sections.length * 600}vw`,
            invalidateOnRefresh: true,
          },
        });
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
    <div ref={containerRef} id="projects" style={{ overflow: "hidden" }}>
      <ScrollingText />
{/* TODO Mobile view is not done at all */}
      <div className="pin-process">
        <div className="inner-div">
          {data.map((project, index) => (
            <div
              ref={(el) => (sectionsRef.current[index] = el)}
              className="process-item-wrapper"
              key={project.name}
            >
              <ProjectCard project={project} index={index + 1} />
            </div>
          ))}
{/* TODO need to make this card take the right size depending on screen width */}
          {/* Last card not in map, static */}
          <div
            ref={(el) => (sectionsRef.current[data.length] = el)}
            className="process-item-wrapper-last"
          >

            <div style={{display: "flex"}}>

            <div style={{ padding: "20px", flexBasis: "50%"      }}>
              <div>Contact </div>
              <h1 style={{ fontSize: "3.5rem" }}>Let's Work Together!</h1>
              <div style={{ marginLeft: "25px" }}>
              <div
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  width: "40%",
                  textAlign: "center",
                  padding: "4px",
                }}
              >
                email@gmail.com
              </div>
              <div
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  width: "40%",
                  textAlign: "center",
                  padding: "4px",
                }}
              >
                000-000-0000
              </div>
            </div>

            </div>

            
            <div style={{padding: "60px", flexBasis: "50%" }}> <p>We are always happy to talk. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button onClick={()=>navigate("/Contact")} style={{background: "black", color: "white", borderRadius: "10px", height:"50px", width: "150px"}}>Contact Now</button>
            
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessAnimation;
