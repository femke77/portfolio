import Layout from "../components/layouts/Layout";
import About from "../components/home/About";
import Intro from "../components/home/Intro";
import Portfolio from "../components/home/Portfolio";
import Skills from "../components/home/Skills";
import Footer from "../components/layouts/Footer";
import Welcome from "../components/home/Welcome";
import Box from "@mui/material/Box";
import ScrollingText from "../components/home/ScrollingText";  //rendered through portfolio2 (CardStacking)
import '../components/home/Intro.css'; // Import CSS file for styles
import Portfolio2 from "../components/home/CardStackingPortfolio";
import ParallaxPortfolio from "../components/AlternateOrTest/ParallaxPortfolio";

// TODO Parallax effects on this page

export default function Home() {
  return (
    <Box >
      <Welcome />
      <Intro />
      <About />
      {/* <ScrollingText /> */}
      <Portfolio2 />
      {/* <Portfolio /> */}
      <Skills />
      {/* <ParallaxPortfolio /> */}
      <Footer />
 
      {/* Testing only: */}
      {/* <Contact2/> */}
      {/* <Contact/>  */}
    </Box>
  );
}
