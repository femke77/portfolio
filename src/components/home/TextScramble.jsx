import React, { useEffect, useRef } from 'react';
// scramble runs once on hover, even if mouse stays on element. want to make it keep scambling?
// need onMouseLeave to set a isHovering state to false, and onMouseEnter to set it to true
// then while isHovering is true, keep running the scramble function

const useTextScramble = (chars = '01') => { // change scramble chars here
  const queueRef = useRef([]);
  const frameRef = useRef(0);
  const frameRequestRef = useRef(null);
  const resolveRef = useRef(null);

  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const update = (el) => {
    let output = '';
    let complete = 0;

    for (let i = 0; i < queueRef.current.length; i++) {    
      let { from, to, start, end, char } = queueRef.current[i];
    
      if (frameRef.current >= end) {
        complete++;
      
        output += to;
      } else if (frameRef.current >= start) {
        if (!char || Math.random() < 0.28) {
          char = randomChar();
          queueRef.current[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }

    el.innerHTML = output;

    if (complete === queueRef.current.length) {
      resolveRef.current();
    } else {
      frameRequestRef.current = requestAnimationFrame(() => update(el));
      frameRef.current++;
    }
  };

  const setTextScramble = (newText, el) => {
    const oldText = el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => {
      resolveRef.current = resolve;
    });

    queueRef.current = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queueRef.current.push({ from, to, start, end });
    }

    cancelAnimationFrame(frameRequestRef.current); // Cancel any previous animation frame
    frameRef.current = 0;
    update(el);

    return promise;
  };

  const cancelScramble = () => {
    cancelAnimationFrame(frameRequestRef.current); // Stop animation frame
  };

  return { setTextScramble, cancelScramble };
};

// accepts phrases array and style object as props
const TextScrambleComponent = (props) => {
  const elRef = useRef(null);
  let counter = 0;
  const { setTextScramble, cancelScramble } = useTextScramble();
  const phrases = props.phrases;


  const handleMouseEnter = () => {
    const next = () => {
      counter++;
      setTextScramble(phrases[counter], elRef.current).then(() => {
        if (counter < phrases.length-1) {
          setTimeout(next, 200); // Continue to the next phrase after 400ms pause to read the phrase[currentIndex]
        } else {      
          counter = phrases.length-1; // Reset counter after completing the cycle
        }
      });
    };

    next();
  };
  const handleMouseOut = () => {
    const next = () => {
      counter--;
      setTextScramble(phrases[counter], elRef.current).then(() => {
        
        if (counter >0) {
          setTimeout(next, 200); // Continue to the next phrase after 400ms pause to read the phrase[currentIndex]
        } else {
        
          counter = 0; // Reset counter after completing the cycle
        }
      });
    };

    next();
  };


  return (
    <div
     style={props.style}
      ref={elRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
    >
      {phrases[0]}
    </div>
  );
};

export default TextScrambleComponent;
