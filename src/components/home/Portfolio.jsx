import Project from "./Project";
import projectData from "../../utils/projectdata.json";
import Grid from "@mui/material/Grid";

function Portfolio() {
  return (
    <Grid id="projects" container={true} justifyContent="center" spacing={2}>
      {projectData.map((project) => (
        <Grid
          sx={{ display: "flex", alignItems: "stretch" }}
          item={true}
          key={project.name}
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={4}
        >
          <Project project={project} />
        </Grid>
      ))}
    </Grid>
  );
}
export default Portfolio;
