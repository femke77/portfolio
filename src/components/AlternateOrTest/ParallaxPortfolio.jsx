import "./ParallaxPortfolio.css";
import { Parallax } from "react-scroll-parallax";
import { ParallaxProvider, useParallaxController } from "react-scroll-parallax";
import { useEffect } from "react";
import Lenis from '@studio-freight/lenis';



export default function ParallaxPortfolio() {

   
  return (

    <div className="parallax-portfolio" style={{ marginTop: "90px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Parallax
          speed={-12}
          easing={"easeIn"}
          style={{ display: "flex", marginTop: "90px", alignItems: "center" }}
        >
          <img src="https://placehold.co/450x450" />
        </Parallax>

        <h4 style={{ margin: "25px" }}> <h1>Project 1</h1>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          odio in consectetur. Consequatur, corporis error! Fugiat labore dolor
          perferendis! Ratione animi aliquid similique architecto consectetur,
          corrupti nam quibusdam error eos?
        </h4>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      >
        <Parallax
          speed={-10}
          easing={"easeIn"}
          style={{ display: "flex", marginTop: "90px", alignItems: "center" }}
        >
          <img src="https://placehold.co/450x450" />
        </Parallax>

        <h4 style={{ margin: "25px" }}> <h1>Project 2</h1>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          odio in consectetur. Consequatur, corporis error! Fugiat labore dolor
          perferendis! Ratione animi aliquid similique architecto consectetur,
          corrupti nam quibusdam error eos?
        </h4>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Parallax
          speed={-10}
          easing={"easeIn"}
          style={{ display: "flex", marginTop: "90px", alignItems: "center" }}
        >
          <img src="https://placehold.co/450x450" />
        </Parallax>

        <h4 style={{ margin: "25px" }}> <h1>Project 3</h1>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          odio in consectetur. Consequatur, corporis error! Fugiat labore dolor
          perferendis! Ratione animi aliquid similique architecto consectetur,
          corrupti nam quibusdam error eos?
        </h4>
      </div>
    </div>

  );
}
