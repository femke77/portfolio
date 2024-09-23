import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function IconTicker() {
  const tickerRef = useRef(null);

  useEffect(() => {
    const ul = tickerRef.current;

    // Wrap all <li> elements in a <span> ticker-wrapper
    const tickerWrapper = document.createElement("span");
    tickerWrapper.classList.add("ticker-wrapper");

    // Move items into tickerWrapper
    Array.from(ul.children).forEach((item) => {
      tickerWrapper.appendChild(item);
    });

    // Clear existing children from the <ul> before appending
    ul.innerHTML = '';
    ul.appendChild(tickerWrapper);

    // Clone the tickerWrapper for infinite scrolling
    const tickerClone = tickerWrapper.cloneNode(true);
    ul.appendChild(tickerClone);

    const totalWidth = tickerWrapper.offsetWidth;
    const tickerWidth = ul.offsetWidth;

    // Set initial position of ticker-wrapper
    gsap.set(tickerWrapper, { x: tickerWidth });

    // Create the infinite scroll animation
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(tickerWrapper, {
      duration: totalWidth / 50, // Adjust speed here
      x: `-${totalWidth}`,
      ease: "none",
      onComplete: () => {
        gsap.set(tickerWrapper, { x: tickerWidth });
      },
    });

    return () => {
      // Cleanup on unmount
      tl.kill();
    };
  }, []);

  return (
    <ul
      ref={tickerRef}
      style={{
        display: "flex",
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: 0,
        margin: 0,
        background: "black",
        color: "white",
      }}
    >
      {/* These items will be animated */}
      <li style={{ display: "inline-block", padding: "0 20px" }}>Test 1</li>
      <li style={{ display: "inline-block", padding: "0 20px" }}>Test 2</li>
      <li style={{ display: "inline-block", padding: "0 20px" }}>Test 3</li>
      <li style={{ display: "inline-block", padding: "0 20px" }}>Test 4</li>
      <li style={{ display: "inline-block", padding: "0 20px" }}>Test 5</li>
    </ul>
  );
}
