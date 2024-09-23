import React, { useEffect, useRef } from 'react';

const useTextScramble = (chars = '01') => {
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
        console.log(output);
        
        output += to;
      } else if (frameRef.current >= start) {
        if (!char || Math.random() < 0.28) {
          char = randomChar();
          queueRef.current[i].char = char;
        }
        output += `${char}`;
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
  const { setTextScramble, cancelScramble } = useTextScramble();

  const phrases = props.phrases;
  let counter = 0;

  const handleMouseEnter = () => {
    const next = () => {
      setTextScramble(phrases[counter], elRef.current).then(() => {
        
        counter++;
        if (counter < phrases.length) {
          setTimeout(next, 800); // Continue to the next phrase
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
    >
      {phrases[0]}
    </div>
  );
};

export default TextScrambleComponent;
