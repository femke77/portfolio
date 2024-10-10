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
import { Grid, useMediaQuery } from "@mui/material";
import { Grid4x4 } from "@mui/icons-material";

// FIXME BELOW 900 NEEDS WORK
// xs, extra-small: 0px
// sm, small: 600px

// LOOKS GOOD:
// md, medium: 900px -
// lg, large: 1200px -
// xl, extra-large: 1536px -

// TODO: When the screen gets really huge move all elements to the center of the screen

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
  const isMobile = useMediaQuery("(max-width:899px)");

 
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

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            anticipatePin: 1,
            scrub: 0.1,
            start: "top top",
            end: () => "+=" + containerRef.current.offsetWidth * 1.1, //part of the pause at the end of the animation
            invalidateOnRefresh: true,
          },
        });

        tl.to(sections, {
          xPercent: (i) => calculateXPercent(i),
          ease: "none",
          duration: (i) => 0.5 * i,
        });

        // Adds a pause at the end of the animation
        tl.set({}, {}, "+=1"); // Change this number to increase or decrease the pause in combinaton with the end of the scrollTrigger
      });

      return () => {
        mm.revert();
      };
    });

    return () => {
      ctx.revert();
    };
  }, []);

  if (isMobile) {
    return (
      <Box>
        <Grid spacing={2}  container>
          {data.map((project) => (
            <Grid item xs={12} sm={6} md={6} lg={6 }>
              <Box className="process-item-wrapper">
              <ProjectCard project={project} key={project.name} />
              </Box>
              
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={6} lg={6 }>
          <Box
            className="process-item-wrapper-last"
         
            sx={{ width: { md: "7vw", lg: "76vw", xl: "76vw" } }} // adjusting these also means adjusting the calculateXPercent function
          >
            <div style={{ display: "flex" }}>
              <div style={{ padding: "25px", flexBasis: "45%" }}>
                <div>Contact </div>
                <h1 style={{ fontSize: "clamp(1.5rem, 2.5rem, 4.5rem)" }}>
                  Let's Work Together!
                </h1>
                <div style={{ marginLeft: "25px" }}>
                  <div style={styles.buttonStyles}>
                    <a
                      href="mailto:adammathis.dev@gmail.com"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TextScrambleComponent
                        phrases={[
                          "adammathis.dev@gmail.com",
                          "001110001111",
                          "Email Adam",
                          "Write an email",
                        ]}
                        style={{ fontWeight: "bold" }}
                      />
                    </a>
                  </div>
                  <div style={styles.buttonStyles}>
                    <a
                      href="tel:6362846762"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TextScrambleComponent
                        phrases={[
                          "636.284.6762",
                          "001110001111",
                          "Adam Mathis",
                          "Call Adam",
                        ]}
                        style={{ fontWeight: "bold" }}
                      />
                    </a>
                  </div>
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

             
            </div>
          </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        id="projects"
        style={{ overflow: "hidden", height: "100vh" }}
      >
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
                  <div style={styles.buttonStyles}>
                    <a
                      href="mailto:adammathis.dev@gmail.com"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TextScrambleComponent
                        phrases={[
                          "adammathis.dev@gmail.com",
                          "001110001111",
                          "Email Adam",
                          "Write an email",
                        ]}
                        style={{ fontWeight: "bold" }}
                      />
                    </a>
                  </div>
                  <div style={styles.buttonStyles}>
                    <a
                      href="tel:6362846762"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TextScrambleComponent
                        phrases={[
                          "636.284.6762",
                          "001110001111",
                          "Adam Mathis",
                          "Call Adam",
                        ]}
                        style={{ fontWeight: "bold" }}
                      />
                    </a>
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
    </>
  );
};

export default ProcessAnimation;
