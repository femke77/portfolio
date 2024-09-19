// Bringing in the required import from 'react-router-dom'
import { Outlet } from "react-router-dom";
import SmoothScrolling from "./components/AlternateOrTest/LenisSmoothScrolling.jsx";
import { CssBaseline } from "@mui/material";
import "./App.css";
import Layout from "./components/layouts/Layout";
import { AnimationProvider } from "./utils/AnimationContext.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import { ParallaxProvider } from "react-scroll-parallax";

function App() {
  // The Outlet component will conditionally swap between the different pages according to the URL
  return (
    <>
      <CssBaseline />
      {/* <SmoothScrolling> */}
        <ParallaxProvider>
          <AnimationProvider>
            <main>
              <Layout>
                <Outlet />
              </Layout>
            </main>
          </AnimationProvider>
        </ParallaxProvider>
      {/* </SmoothScrolling> */}
    </>
  );
}

export default App;
