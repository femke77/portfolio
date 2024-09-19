import "./ProjectCard.css";
import * as projects from "../../assets/index.js";
export default function ProjectCard({ project, index }) {
  let i = 1;
  return (
    <>
      {/*  shows on hover */}
      <a   className="project-hover" href="https://google.com">
        <img
        
          src={projects[project.image]}
          alt={project.name}
        />
       <a className="icon-hover" href="https://github.com/adam" ><i className=" fa-brands fa-github fa-5x fa" style={{color: "gray", backgroundColor: "white", borderRadius: "50%"}}></i></a>

      </a>{" "}

      {/* shows on page load*/}
      <div
        style={{ position: "relative", width: "100%", padding: "50px 30px" }}
        className="project-text"
      >
        <h4 style={{fontSize:"2rem", marginBottom: "35px"}}>{project.name}</h4>

        <div>
          <p>{project.description}</p>
        </div>
      </div>
    </>
  );
}
