import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollTriggeredAbout.css'; // Import your CSS file

gsap.registerPlugin(ScrollTrigger);

const RevealComponent = () => {
  const textRef = useRef(null); // Reference to the text container
  const [words, setWords] = useState([]); // State to hold split words
  const spansRef = useRef([]);
  
  useEffect(() => {
    // Split the text into words and store them in state
    const text = `Hey! I'm Adam, a full stack developer with a diverse background and extensive skillset. I've spent many years managing people and projects, learning to measure and maximize impact, and collaborating across teams. I have an excellent eye for detail and love solving problems. 
`;
    const splitWords = text.split(' ');
    setWords(splitWords); // Set the words in state

  }, []);

  useEffect(() => {
    if (!textRef.current || words.length === 0) return;

    // GSAP Animation for revealing words
    gsap.fromTo(
      spansRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 3, 
        duration: 2,
        scrollTrigger: {
          trigger: textRef.current.closest('.scroll-trigger'),
          start: '-50px center',
          end: () => `+=${350}px`,
          scrub: true,
  
        }
      }
    );
  }, [words]); // Run this effect after words are rendered

  return (
    <div className="scroll-trigger">
      <section>
        <div className="container">
          <p className="reveal" ref={textRef}>
            {/* Render each word inside a span */}
            {words.map((word, index) => (
              <span  ref={(el) => (spansRef.current[index] = el)} key={index}>{word}&nbsp;</span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
};

export default RevealComponent;
