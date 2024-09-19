import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";

export default function ScrollAnimation() {
  const textRef = useRef(null);

  const animate = (element, position) => {
    if (element.current) {
      element.current.style.transform = `translateX(${position}px)`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const lastKnownScrollPosition = window.scrollY;

      window.requestAnimationFrame(() => {
        animate(textRef, lastKnownScrollPosition * -0.2);
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to ensure this runs only on mount and unmount

  return (
    <Box
      style={{
        paddingTop: "3rem",
        whiteSpace: "nowrap",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        ref={textRef}
        sx={{
          fontSize: {
            xs: "80px",
            sm: "199px",
   
          },
          transition: "transform 0.2s linear",
          paddingRight: "100px",
          letterSpacing: "0.5px",
        }}
      >
        {/* <span style={{ color: "blue" }}>P</span>ORK
        <span style={{ color: "blue" }}>W</span>ORK
        <span style={{ color: "blue" }}>W</span>ORK
        <span style={{ color: "blue" }}>W</span>ORK
        <span style={{ color: "blue" }}>W</span>ORK */}

        {/* Alternate: */}

        WORK<span style={{ color: "blue" }}>WORK</span>WORK
        <span style={{ color: "blue" }}>WORK</span>WORKWORKWORK
      </Box>
    </Box>
  );
}
