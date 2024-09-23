import Intro from "../components/home/Intro";
import Skills from "../components/home/Skills";
import Footer from "../components/layouts/Footer";
import Welcome from "../components/home/Welcome";
import Box from "@mui/material/Box";
import "../components/home/Intro.css"; // Import CSS file for styles
import Portfolio2 from "../components/home/CardStackingPortfolio";
import IconTicker from "../components/home/IconTicker";
// TODO Parallax effects on this page

export default function Home() {
  return (
    <Box>
      <Welcome />
      <Intro />
      <Portfolio2 />
      <Skills />
      <IconTicker />
      <Footer />
    </Box>
  );
}
