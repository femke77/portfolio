import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Box from "@mui/material/Box";
import javaScriptLogo from "../../assets/images/logos/javascript-logo.png";
import bootstrapLogo from "../../assets/images/logos/bootstrap-logo.png";
import cssLogo from "../../assets/images/logos/css-logo.png";
import expressLogo from "../../assets/images/logos/express-logo.png";
import githubLogo from "../../assets/images/logos/github-logo.png";
import handlebarsLogo from "../../assets/images/logos/handlebars-logo.png";
import mongodbLogo from "../../assets/images/logos/mongodb-logo.png";
import muiLogo from "../../assets/images/logos/mui-logo.png";
import nodeLogo from "../../assets/images/logos/nodeJS-logo.png";
import postgresqlLogo from "../../assets/images/logos/postgresql-logo.png";
import reactLogo from "../../assets/images/logos/react-logo.png";
import sequelizeLogo from "../../assets/images/logos/sequelize-logo.png";

const skills = [
  { title: "JavaScript", src: javaScriptLogo, alt: "JavaScript Logo" },
  { title: "Express", src: expressLogo, alt: "Express Logo" },
  { title: "Node.js", src: nodeLogo, alt: "Node.js Logo" },
  { title: "React", src: reactLogo, alt: "React Logo" },
  { title: "MUI", src: muiLogo, alt: "MUI Logo" },
  { title: "CSS", src: cssLogo, alt: "CSS Logo" },
  { title: "GitHub", src: githubLogo, alt: "GitHub Logo" },
  { title: "PostgreSQL", src: postgresqlLogo, alt: "PostgreSQL Logo" },
  { title: "MongoDB", src: mongodbLogo, alt: "MongoDB Logo" },
  { title: "Sequelize", src: sequelizeLogo, alt: "Sequelize Logo" },
  { title: "Bootstrap", src: bootstrapLogo, alt: "Bootstrap Logo" },
  { title: "Handlebars", src: handlebarsLogo, alt: "Handlebars Logo" },
];

export default function Skills() {
  const boxesRef = useRef([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const boxes = gsap.utils.toArray(boxesRef.current);
    gsap.set(boxes, {
      backgroundColor: "transparent",
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
        xPercents[i] = (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100;
        return xPercents[i];
      },
    });

    gsap.set(items, { x: 0 });

    const totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX");

    for (let i = 0; i < length; i++) {
      const item = items[i];
      const curX = (xPercents[i] / 100) * widths[i];
      const distanceToStart = item.offsetLeft + curX - startX;
      const distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

      tl.to(
        item,
        {
          xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
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

    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // Pre-render for performance

    return tl;
  }

  return (
    <Box
      id="skills"
      ref={wrapperRef}
      style={{ overflow: "hidden", whiteSpace: "nowrap", marginTop: "25px" }}
    >
      {skills.map((skill, index) => (
        <img
          ref={(el) => (boxesRef.current[index] = el)}
          src={skill.src}
          alt={skill.alt}
          title={skill.title}
          style={{
            width: "125px",
            height: "100px",
            display: "inline-block",
            objectFit: "contain",
            backgroundColor: "transparent",
            margin: "15px",
          }}
        />
      ))}
    </Box>
  );
}
