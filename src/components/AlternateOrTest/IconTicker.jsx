import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const colors = ["#f38630", "#6fb936", "#ccc", "#ff0000", "#0000ff"];

export default function IconTicker() {
  const boxesRef = useRef([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const boxes = gsap.utils.toArray(boxesRef.current);
    gsap.set(boxes, {
      backgroundColor: gsap.utils.wrap(colors),
    });

    const loop = horizontalLoop(boxes, { paused: false, repeat: -1 });

    return () => {
      loop.kill(); 
    };
  }, []);

  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    });

    const length = items.length;
    const startX = items[0].offsetLeft;
    const times = [];
    const widths = [];
    const xPercents = [];
    let curIndex = 0;
    const pixelsPerSecond = (config.speed || 1) * 100;

    gsap.set(items, {
      xPercent: (i, el) => {
        const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = parseFloat(gsap.getProperty(el, "x", "px")) / w * 100;
        return xPercents[i];
      },
    });

    gsap.set(items, { x: 0 });

    const totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX");

    for (let i = 0; i < length; i++) {
      const item = items[i];
      const curX = (xPercents[i] / 100) * widths[i];
      const distanceToStart = item.offsetLeft + curX - startX;
      const distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

      tl.to(item, {
        xPercent: (curX - distanceToLoop) / widths[i] * 100,
        duration: distanceToLoop / pixelsPerSecond,
      }, 0)
        .fromTo(item, {
          xPercent: (curX - distanceToLoop + totalWidth) / widths[i] * 100,
        }, {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        }, distanceToLoop / pixelsPerSecond)
        .add("label" + i, distanceToStart / pixelsPerSecond);

      times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index, vars) {
        vars = vars || {};
        if (Math.abs(index - curIndex) > length / 2) {
          index += index > curIndex ? -length : length; 
        }
        const newIndex = gsap.utils.wrap(0, length, index);
        let time = times[newIndex]; 
      
        if (time > tl.time() !== index > curIndex) { 
          vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }

    tl.next = vars => toIndex(curIndex + 1, vars);
    tl.previous = vars => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // Pre-render for performance

    return tl;
  }

  return (
    <div ref={wrapperRef} className="wrapper" style={{ overflow: "hidden", whiteSpace: "nowrap", marginTop: "25px" }}>
        
      <div className="box" ref={el => (boxesRef.current[0] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[1] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[2] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[3] = el)} style={{ display: "inline-block", width: "100px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[4] = el)} style={{ display: "inline-block", width: "125px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[5] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[6] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[7] = el)} style={{ display: "inline-block", width: "170px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[8] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[9] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[10] = el)} style={{ display: "inline-block", width: "200px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[11] = el)} style={{ display: "inline-block", width: "50px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[12] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[13] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[14] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[15] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[16] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[17] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
      <div className="box" ref={el => (boxesRef.current[18] = el)} style={{ display: "inline-block", width: "150px", height: "100px" }}></div>
    </div>
  );
}
