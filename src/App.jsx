
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import "./App.css";
import Layout from "./components/layouts/Layout";
import { AnimationProvider } from "./utils/AnimationContext.jsx";


function App() {
  // The Outlet component will conditionally swap between the different pages according to the URL
  return (
    <>
      <CssBaseline />
   {/* animation provider controls welcome animation happening only once (unless user reloads) */}
          <AnimationProvider>
            <main>
              <Layout>
                <Outlet />
              </Layout>
            </main>
          </AnimationProvider>
     
    </>
  );
}

export default App;
